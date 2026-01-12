# Plan de Implementación: Sistema Multi-idioma (i18n) Híbrido

Este documento detalla la planificación para integrar soporte multi-idioma en la plataforma Gulah, permitiendo traducciones tanto automáticas como manuales para contenido estático y dinámico.

## 1. Objetivos
- Permitir que los usuarios cambien el idioma de la web (ES/EN inicialmente).
- Traducir elementos de la interfaz (botones, menús, etiquetas).
- Traducir contenido dinámico (Carta de platos y posts del Journal).
- Implementar un sistema de traducción automática integrable en el panel de administración con capacidad de edición manual.

## 2. Arquitectura Técnica

### A. Base de Datos (Backend - SQLAlchemy)
- **Modificación de Modelos**: Migrar campos de texto simple (`String`, `Text`) en `MenuItem` y `BlogPost` a tipos `JSON` para almacenar diccionarios por idioma.
    - Ejemplo: `name = Column(JSON)` -> `{"es": "Hamburguesa", "en": "Burger"}`.
- **Configuración de Sitio**: Añadir claves en `SiteConfig` para:
    - `i18n_settings`: Idiomas soportados y por defecto.
    - `interface_dictionary`: Diccionario global para textos fijos de la UI.

### B. Servicio de Traducción (Backend - FastAPI)
- **Integración**: Implementar un módulo utilizando librerías como `deep-translator` o APIs de servicios (DeepL/Google) para realizar traducciones en caliente.
- **Endpoint**: Nueva ruta `POST /admin/translate` que acepte un texto y el idioma destino, devolviendo la traducción sugerida.

### C. Estado Global (Frontend - React Context)
- **LanguageContext**: Proveedor que gestione el idioma actual (`currentLanguage`) y cargue el diccionario de interfaz desde la base de datos.
- **Función de Traducción `t()`**: Función accesible desde cualquier componente para traducir claves de la interfaz: `t('nav_menu')`.

## 3. Interfaz de Usuario (Admin Dashboard)

### Gestión de Platos y Eventos
- **Pestañas de Idioma**: Los formularios tendrán selectores de idioma (ES | EN).
- **Botón "Traducir Automáticamente" (✨)**: Junto a los campos de texto, este botón llamará al backend y rellenará el campo del idioma secundario.
- **Edición Manual**: El campo traducido será un input estándar, permitiendo al administrador corregir la traducción automática antes de guardar.

### Ajustes Globales
- **Nueva Pestaña "Idiomas"**:
    - Selector de idiomas activos en la web.
    - Editor de diccionario de interfaz (Clave -> Valor por cada idioma).

## 4. Próximos Pasos (Pendiente de Ejecución)
1. Instalar dependencias de traducción en el backend.
2. Realizar migración de base de datos para soportar JSON en campos de texto.
3. Crear `LanguageContext.jsx` y envolver la aplicación.
4. Actualizar formularios en `AdminDashboard.jsx` con el selector de idiomas y botones de traducción.

---
*Este plan queda guardado para su implementación futura a petición del usuario.*
