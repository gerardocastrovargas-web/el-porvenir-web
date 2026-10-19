# EL PORVENIR — Premium Cinematic Web 2.4

**Actualización de motion y experiencia móvil (secuencial pasos 1 y 2).** Consulta `MEJORAS_V2_4.md` y `CAMBIOS_V2_1.md`.

**Prueba local:** `npm install`, después `npm run dev`. **Verificación:** `npm run build`.

**Demo:** abre `preview.html` desde la carpeta del proyecto; la versión HTML independiente se entrega aparte con imágenes integradas y efectos nativos. La experiencia GSAP completa vive en Next.js.

**Antes de publicar:** verificar geometrías de los predios, condiciones de pago, imágenes conceptuales y formulario Supabase.

---

# EL PORVENIR — Coastal Land Investment · Website v1.0

A Next.js/React/TypeScript website for Reynoso & Asociados, built from the approved seven-section design system. Includes responsive EN/ES navigation, GSAP scroll animations, gallery/lightbox, parcel-selection interface, investment overview and Supabase-ready private-inquiry form.

## Run locally

**Requirements:** Node.js 20.9+ (Node 22 LTS recommended), npm, internet for first dependency installation.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open **http://localhost:3000**. To prepare for production:

```bash
npm run typecheck
npm run build
npm run start
```

**Important build-validation note:** The project was assembled and statically checked in the artifact environment, but the remote npm registry did not respond here, so the dependency installation and Next.js production build could not be executed in that environment. Run `npm install` and `npm run build` on your computer or CI before declaring it deployed.

## Site content

| No. | Section | Experience |
| --- | --- | --- |
| 01 | Hero | Intro, landscape concept art, two CTAs, metrics, GSAP |
| 02 | The Opportunity | Investment metrics, architectural concept image clearly labelled |
| 03 | Explore the Territory | Clickable parcel selector / illustrated map with cards; MapLibre adapter for verified GeoJSON |
| 04 | Development Vision | Three conceptual project directions, with clearly labelled renders |
| 05 | Gallery & Experience | Left-aligned photography mosaic, six expandable photographs; originals distinguished from concepts |
| 06 | Investment Overview | Offer price and historical appraisal context with caveats, three-payment proposal with no invented installments |
| 07 | Contact | Footer-style private inquiry form, direct WhatsApp, legal disclaimers |

All content strings are stored in `src/lib/content.ts`; toggle EN/ES from the site navigation.

## Genuine, visualized, and illustrative imagery

- `public/assets/original-*.webp` and `historical-*.webp`: cropped/adjusted **source photographs** supplied by the client, often from older promotional composites. Their dates/current condition require confirmation. No design-implied condition should be read as current.
- `public/assets/hero-concept.webp`, `architecture-concept.webp`, and `vision-*.webp`: **conceptual imagery**, not documentary evidence of actual on-site facilities. The architecture concept is an AI-imagined future condition and must not be used as a current-condition photo.
- `public/assets/territory-reference.webp`: a **conceptual illustrated reference**, with visually depicted boundaries; **not a surveyed legal map**, not georeferenced, and not a certified parcel outline.
- Source photos and licensed satellite imagery should replace conceptual sources before public investor marketing where appropriate. Do not publish Google imagery without appropriate licensing.

## Verified geographic boundaries and MapLibre GL JS

The offline-ready parcel selection UI works without internet by using a *conceptual background image* and SVG hit regions. These drawn hotspots are **not legal boundaries** and are intentionally labeled as approximate.

For a real geographical map:

1. Obtain the topographic survey/cadastral file with **verified WGS84 coordinates**, including both parcel outlines. Consult a surveyor if needed.
2. Export valid features to `public/data/parcels.geojson`; each feature needs `properties.id` equal to `"baja"` or `"california"`. (Sample file is intentionally empty.)
3. Set `NEXT_PUBLIC_ENABLE_VERIFIED_MAP=true` in `.env.local`.
4. Optionally set `NEXT_PUBLIC_MAP_STYLE_URL` to a licensed MapLibre-compatible map style. By default verified mode uses an OpenStreetMap raster map; check tile usage policies for production traffic.
5. Restart the Next.js server / redeploy. MapLibre loads only in verified mode.

**No geographic coordinates have been invented.** Technical investor materials should always indicate if displayed parcel geometry has not been legally surveyed.

## Investor inquiries + Supabase

The WhatsApp link works immediately (`NEXT_PUBLIC_CONTACT_WHATSAPP` in `.env.local`). The inquiry form validates basic fields and posts to `/api/inquiry`.

- Without Supabase credentials, the server returns HTTP **503**; the user is **explicitly informed** their online request wasn't stored, and offered WhatsApp. No false submission success.
- To store inquiries, create your Supabase project, execute `supabase.sql` in its SQL editor, then configure **server-side** `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` in `.env.local` or Vercel environment settings. Never expose the service-role key through a `NEXT_PUBLIC_` variable or commit `.env.local`.
- Before public launch add spam/rate limiting (e.g. Turnstile), transactional notifications, privacy notice, data-retention terms, and authorization/access controls for the internal lead database.
- Legal documents, deeds, complete appraisal reports and personally identifying buyer records are **not** bundled in this public repository.

## Deployment: GitHub + Vercel

1. Create an empty GitHub repository (`el-porvenir`); **do not commit `.env.local`**.
2. In this folder run `git init`, `git add .`, `git commit -m "El Porvenir website v1"`, then `git remote add origin <your-repository-url>` and `git push -u origin main`.
3. On Vercel, select **Add New → Project → Import Git Repository**, use default Next.js settings.
4. Set the production environment variables in Vercel as appropriate. Leave the parcel-geo flag off until coordinates are verified.
5. Run the Vercel deployment and manually verify mobile, scrolling, navigation, form and map on the public URL.
6. The site ships with `noindex, nofollow` + robots disallow to avoid premature indexing. Change these settings in `src/app/layout.tsx` and `src/app/robots.ts` only after legal/content approval and authorization to market the offering publicly.

## Pending before public launch

- Verify exact cadastral area and parcels, legal title, current registry status, access and development entitlements.
- Confirm exact financing amounts, milestone dates and guarantees. **Three equal US$2.5M payments were intentionally NOT represented as agreed terms.**
- Confirm the 2019 reference appraisals and the full 2026 valuation; do not advertise historical appraisal values as current guaranteed value or an 82% instant gain.
- Date each source photograph and obtain updated photographs where the current condition may differ.
- Replace/review conceptual geography and imagery to avoid misleading investors.
- Add domain, brand rights, privacy notice, and R&A's final contact/legal details.

## Structure

```
src/app/page.tsx                  all seven sections + i18n + GSAP
src/app/globals.css               design system, responsive rules
src/app/api/inquiry/route.ts      inquiry validation and Supabase insert
src/components/TerritoryMap.tsx  illustrated interactive parcel selector
src/components/VerifiedMap.tsx   MapLibre adapter for verified GeoJSON
src/components/InvestorForm.tsx  validated form + WhatsApp fallback
src/lib/content.ts                bilingual content and parcel data
public/assets                    web images optimized as WebP and PNG
public/data/parcels.geojson      deliberately empty, awaiting survey
supabase.sql                      server-only lead table schema
```


## Experiencia cinematográfica 2.0

Consulta [`ANIMACIONES_V2.md`](ANIMACIONES_V2.md) para ver la implementación GSAP, los límites de la vista offline y las pruebas pendientes. Las secciones se mantienen editables en React y los recursos gráficos están en `public/assets`.


## Galería 2.1 — Nueva imagen

Se incorpora `public/assets/real-retouched-cactus-dunes.webp` como **séptima imagen de galería** (seis fotografías/imágenes previas conservadas). La foto fue retocada con IA sobre un recurso auténtico aportado por el cliente. Debe identificarse como *imagen retocada digitalmente* y no como registro fiel del estado actual de los inmuebles. En la galería y el lightbox se distingue de la visualización arquitectónica conceptual.
