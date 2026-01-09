# Plan de Implementación - Gulah Project

Este plan detalla los pasos para finalizar la aplicación web de Gulah, asegurando una estética premium y funcionalidad completa.

## 1. Refuerzo Estético (Aesthetics WOW)
- [x] **Animaciones de entrada**: Implementar `framer-motion` en Home y Menu.
- [ ] **Animaciones en el resto de páginas**: Reservas, Eventos.
- [ ] **Efectos de Scroll**: Añadir animaciones que se disparen al hacer scroll (reveal effect).
- [ ] **Micro-interacciones**: Mejorar los estados hover de los botones y tarjetas de la carta.
- [ ] **Tipografía y Colores**: Ajustar contrastes y espaciados para un look más "premium".

## 2. Funcionalidad de Blog y Eventos
- [x] **Página de Detalle**: Crear `EventDetail.jsx` para mostrar el contenido completo de un post.
- [x] **Navegación**: Vincular los botones "Leer más" a sus respectivas páginas de detalle.

## 3. Navegación y Responsividad
- [x] **Menú Mobile**: Implementar un menú de hamburguesa funcional y estético para móviles.
- [ ] **Sticky Navbar**: Mejorar la visibilidad de la navegación al hacer scroll.

## 4. Gestión y Admin
- [ ] **Previsualización de Imágenes**: Mejorar el sistema de subida en el Dashboard para ver la imagen antes de guardar.
- [ ] **Feedback de Usuario**: Añadir notificaciones (toast) al guardar cambios en el modo edición.

## 5. Lanzamiento y Verificación
- [ ] **Script de Inicio rápido**: Crear un comando simple para levantar Backend y Frontend simultáneamente.
- [ ] **Control de Errores**: Asegurar que la web no se rompa si el backend está caído (empty states agradables).
