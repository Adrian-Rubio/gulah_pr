# Guía de Migración de Gulah a Ubuntu Server (Sin Docker)

Esta guía detalla los pasos para desplegar la aplicación Gulah en un servidor Ubuntu nativo, utilizando Nginx para el frontend y Systemd para gestionar el backend de Python.

---

## 1. Requisitos Previos

En tu servidor Ubuntu, instala las dependencias necesarias:

```bash
sudo apt update
sudo apt install -y python3-pip python3-venv nginx git nodejs npm
```

---

## 2. Preparación del Código

Clona el repositorio en tu servidor (ej. en `/var/www/gulah`):

```bash
sudo mkdir -p /var/www/gulah
sudo chown $USER:$USER /var/www/gulah
cd /var/www/gulah
git clone <https://github.com/Adrian-Rubio/gulah_pr> .
```

---

## 3. Configuración del Backend (FastAPI)

1. **Crear entorno virtual**:
   ```bash
   cd /var/www/gulah/restaurant_app/backend
   python3 -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   ```

2. **Servicio Systemd**: Crea un archivo para que el backend se ejecute solo:
   ```bash
   sudo nano /etc/systemd/system/gulah-backend.service
   ```
   *Pega lo siguiente (ajusta los caminos si son distintos):*
   ```ini
   [Unit]
   Description=Gulah Backend API
   After=network.target

   [Service]
   User=adrian  # Cambia por tu usuario de Ubuntu
   WorkingDirectory=/var/www/gulah/restaurant_app/backend
   Environment="PATH=/var/www/gulah/restaurant_app/backend/venv/bin"
   ExecStart=/var/www/gulah/restaurant_app/backend/venv/bin/uvicorn main:app --host 0.0.0.0 --port 8000
   Restart=always

   [Install]
   WantedBy=multi-user.target
   ```

3. **Activar servicio**:
   ```bash
   sudo systemctl daemon-reload
   sudo systemctl enable gulah-backend
   sudo systemctl start gulah-backend
   ```

---

## 4. Configuración del Frontend (React + Vite)

1. **Instalar y Build**:
   ```bash
   cd /var/www/gulah/restaurant_app/frontend
   npm install
   # IMPORTANTE: Cambia la IP por la IP pública/local de tu VM
   VITE_API_URL=http://<IP_DE_TU_VM>:8000 npm run build
   ```

---

## 5. Configuración de Nginx

Configuraremos Nginx para servir el frontend y actuar como puente (proxy) hacia el backend.

1. **Crear configuración**:
   ```bash
   sudo nano /etc/nginx/sites-available/gulah
   ```
   *Pega lo siguiente:*
   ```nginx
   server {
       listen 80;
       server_name <IP_DE_TU_VM>;

       # Frontend
       location / {
           root /var/www/gulah/restaurant_app/frontend/dist;
           try_files $uri /index.html;
       }

       # Backend Proxy (Rutas de la API)
       location /config { proxy_pass http://localhost:8000; }
       location /menu { proxy_pass http://localhost:8000; }
       location /blog { proxy_pass http://localhost:8000; }
       location /admin { proxy_pass http://localhost:8000; }
       location /static { proxy_pass http://localhost:8000; }
   }
   ```

2. **Activar y Reiniciar**:
   ```bash
   sudo ln -s /etc/nginx/sites-available/gulah /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

---

## 6. Mejoras de Infraestructura Recomendadas

1. **Seguridad (Firewall)**: Solo abre lo necesario.
   ```bash
   sudo ufw allow 80    # Nginx HTTP
   sudo ufw allow 22    # SSH
   sudo ufw enable
   ```
2. **Base de Datos**: Actualmente usas SQLite (`restaurant.db`). Si el tráfico crece, considera migrar a **PostgreSQL**.
3. **SSL (HTTPS)**: Usa `certbot` para obtener un certificado gratuito de Let's Encrypt si tienes un dominio.
4. **Logs**: Puedes ver qué pasa en tu backend con:
   ```bash
   journalctl -u gulah-backend -f
   ```

---

¡Listo! Ahora deberías poder acceder a la web simplemente poniendo la IP de tu VM en el navegador.
