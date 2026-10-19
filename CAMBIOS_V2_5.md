# El Porvenir Web 2.5 · Investment Value Bars

- La sección 06 presenta **tres barras proporcionales**: avalúo documental de 2026, avalúos históricos de 2019 y precio de oferta.
- Animación escalonada al llegar a la comparativa: GSAP/ScrollTrigger en Next.js; IntersectionObserver y Web Animations API en la vista HTML independiente.
- Los valores 2026 MXN $2,081,569,914 y equivalencia aproximada US$104M se muestran **solo como cifras de referencia aportadas**, no verificadas. La equivalencia no representa un tipo de cambio actual.
- Los anchos relativos se obtuvieron de las referencias expresadas en USD: 100%, 40.84% y 7.21%. Comparan documentos de distinta fecha y posible metodología, por lo que **no implican un descuento o rentabilidad demostrada**.
- El precio de oferta US$7,500,000, superficie aproximada 693.83 ha y dos predios se mantienen.
- Se respetan el selector EN/ES, los demás diseños, el mapa y las animaciones existentes.
- `prefers-reduced-motion` desactiva las animaciones. Sin JavaScript las barras se ven completas.
- Aún es necesario validar `npm install && npm run build` antes de publicar, pues el registro de npm no ha respondido en este entorno.
