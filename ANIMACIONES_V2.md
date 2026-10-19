# EL PORVENIR · Experiencia Cinematográfica 2.0

## Características nuevas

- **Apertura (Hero):** secuencia de logotipo/menú, título en dos líneas, descripción, CTA y datos; zoom de fondo y parallax vinculado a scroll.
- **Barra de progreso** dorado champagne a lo largo del recorrido, navegación con vidrio esmerilado al desplazarse.
- **The Opportunity:** fotografía con revelado (máscara), escala suave, métricas con aparición escalonada, contadores 693.83 y 02 (manteniendo las cifras sin alterar el dato fuente).
- **Territorio:** entrada gradual del mapa y fichas; seleccionar un predio resalta su zona ilustrativa y anima la ficha. En móvil los botones siguen accesibles.
- **Development Vision:** historia horizontal con ScrollTrigger fijando el escenario en escritorio con mouse; tablet/móvil muestran tarjetas verticales para evitar bloquear la navegación.
- **Gallery:** fotografías aparecen una tras otra, zoom moderado al pasar el cursor y galería ampliable por clic.
- **Investment Overview:** paneles y etapas de pago aparecen progresivamente. Los importes de las tres exhibiciones NO están fijados.
- **Contacto:** parallax del fondo, entrada tipográfica y del panel de contacto.

## Limitaciones de la demostración

La **vista previa HTML offline** usa IntersectionObserver y CSS/JavaScript nativos para simular la entrada de secciones; no es la ejecución de GSAP. Las animaciones reales ScrollTrigger están en `src/lib/useCinematicScroll.ts` y se ejecutarán desde Next.js tras instalar dependencias.

No se ejecutó `next build` en este entorno porque el registro npm no resuelve. Revisamos sintaxis TS/TSX por separado e integridad del proyecto. La validación visual automatizada con Chromium no concluyó en este entorno; realiza la revisión visual en tu navegador. Realizar `npm install && npm run build` localmente antes de publicar.

## Motion / accesibilidad

- Respetamos `prefers-reduced-motion`.
- Las animaciones solo transforman elementos visuales; no ocultan por defecto información esencial si GSAP no se ejecuta.
- Scroll horizontal fijado limitado a escritorio >=960 px con puntero preciso.
- Limpieza de ScrollTriggers al desmontar o cambiar idioma.

## Datos y responsabilidad de publicación

Polígonos actuales **ilustrativos**, no catastrales. La fotografía hero y las versiones de arquitectura/resort son **conceptuales**, no evidencia del estado actual. No se muestra un calendario contractual definitivo de tres pagos. La web mantiene `noindex` hasta revisar documentos/claims antes de publicación.
