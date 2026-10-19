# EL PORVENIR · 2.4 · Motion + Mobile

## Paso 1 — Pulido cinematográfico
- Animación inicial elegante y secuenciada sin reiniciarse con el selector de idioma.
- Parallax moderado del Hero, aparición editorial por sección, contadores y paneles escalonados.
- Desarrollo horizontal con ScrollTrigger (solo escritorio con puntero fino).
- Limpieza de efectos al desmontar y adaptación por media queries/`prefers-reduced-motion`.
- Refresh después de cargar imágenes y tipografías y al cambiar de idioma.
- Capa de animaciones progresiva: el contenido sigue disponible si el movimiento está desactivado.

## Paso 2 — Mobile UX
- Correcciones de tipografía, espacios, cabecera fija y áreas táctiles para 320, 360, 390 y 768 px.
- Mapa completo y selector accesible en móvil; sin polígonos clicables desalineados cuando se aplica `object-fit:contain`.
- Las tarjetas Development Vision se despliegan verticalmente en pantallas táctiles, sin pin ni scroll horizontal forzado.
- Galería, fichas y footer mejorados para pantallas estrechas.
- Menú móvil con `aria-expanded`, `aria-controls` y cierre con Escape.

## Antes de publicar
Los polígonos son ilustrativos, no catastrales; renders etiquetados como conceptuales. Es necesario revisar contenido, legalidad y operación de contacto.
La compilación de Next.js queda pendiente de confirmar con `npm install && npm run build` en un entorno con npm habilitado.
