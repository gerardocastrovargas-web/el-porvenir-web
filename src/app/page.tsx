'use client';
import { useEffect, useState, useRef } from 'react';

type Lang = 'en' | 'es';
type ParcelId = 'all' | 'baja' | 'california';

const previewI18n = {
  en: {
    nav: ['Opportunity', 'Territory', 'Vision', 'Gallery', 'Investment', 'Contact'],
    heroEyebrow: 'EL PORVENIR · SAN FELIPE · BAJA CALIFORNIA',
    heroTitle: 'Where the desert',
    heroAccent: 'meets the sea.',
    heroDesc: 'A large-scale coastal land investment opportunity on the Gulf of California.',
    heroBtn: 'Explore the opportunity →',
    opportunityEyebrow: '02 — THE OPPORTUNITY',
    opportunityTitle: 'An extraordinary',
    opportunityAccent: 'land opportunity.',
    opportunityDesc: 'Two privately held land parcels offered together, in a setting where the desert meets the Gulf of California.',
    territoryEyebrow: '03 — EXPLORE THE TERRITORY',
    territoryTitle: 'Understand the',
    territoryAccent: 'land configuration.',
    territoryDesc: 'Select one of the two parcels in this combined offering to view the summary.',
    visionEyebrow: '04 — DEVELOPMENT VISION',
    visionTitle: 'One landscape.',
    visionAccent: 'Many possibilities.',
    visionDesc: 'Illustrative use cases only — planning, permits and independent feasibility review required.',
    galleryEyebrow: '05 — GALLERY & EXPERIENCE',
    galleryTitle: 'See the place.',
    galleryAccent: 'Feel the setting.',
    galleryDesc: 'Explore the coastline, desert landscapes and original structures through selected visual records. Historic photos, AI-retouched imagery and future concepts are identified separately.',
    investmentEyebrow: '06 — INVESTMENT OVERVIEW',
    investmentTitle: 'Investment information',
    investmentAccent: 'for informed decisions.',
    investmentDesc: 'An initial summary of the offer, not a financial performance guarantee.',
    contactEyebrow: '07 — PRIVATE INVESTMENT INQUIRY',
    contactTitle: 'Begin the',
    contactAccent: 'conversation.',
    contactDesc: 'Qualified investors are invited to request a private presentation and additional due diligence materials.',
  },
  es: {
    nav: ['Oportunidad', 'Territorio', 'Visión', 'Galería', 'Inversión', 'Contacto'],
    heroEyebrow: 'EL PORVENIR · SAN FELIPE · BAJA CALIFORNIA',
    heroTitle: 'Donde el desierto',
    heroAccent: 'encuentra al mar.',
    heroDesc: 'Una oportunidad de inversión territorial en la costa del Golfo de California.',
    heroBtn: 'Explorar oportunidad →',
    opportunityEyebrow: '02 — LA OPORTUNIDAD',
    opportunityTitle: 'Una oportunidad territorial',
    opportunityAccent: 'extraordinaria.',
    opportunityDesc: 'Dos predios privados ofrecidos en conjunto, en un entorno donde el desierto se encuentra con el Golfo de California.',
    territoryEyebrow: '03 — EXPLORA EL TERRITORIO',
    territoryTitle: 'Comprende la',
    territoryAccent: 'configuración territorial.',
    territoryDesc: 'Selecciona uno de los dos predios de esta oferta conjunta para ver su resumen.',
    visionEyebrow: '04 — VISIÓN DE DESARROLLO',
    visionTitle: 'Un territorio.',
    visionAccent: 'Muchas posibilidades.',
    visionDesc: 'Usos ilustrativos únicamente; todo proyecto requiere planeación, permisos y revisión de factibilidad independiente.',
    galleryEyebrow: '05 — GALERÍA Y EXPERIENCIA',
    galleryTitle: 'Conoce el lugar.',
    galleryAccent: 'Siente el entorno.',
    galleryDesc: 'Explora la costa, el paisaje desértico y las estructuras existentes mediante registros visuales seleccionados. Las fotos históricas, las imágenes retocadas con IA y los conceptos futuros están identificados por separado.',
    investmentEyebrow: '06 — RESUMEN DE INVERSIÓN',
    investmentTitle: 'Información de inversión',
    investmentAccent: 'para decidir mejor.',
    investmentDesc: 'Una síntesis inicial de la oferta; no constituye garantía de desempeño financiero.',
    contactEyebrow: '07 — CONTACTO PRIVADO',
    contactTitle: 'Comencemos la',
    contactAccent: 'conversación.',
    contactDesc: 'Los inversionistas calificados pueden solicitar una presentación privada y materiales adicionales de due diligence.',
  },
};

const parcelData = {
  baja: {
    title: 'Baja Land',
    surface: '646.21 ha',
    summary: {
      en: 'Inland parcel; approximate size per supplied documents.',
      es: 'Predio interior con vocación hotelera y residencial; superficie sujeta a verificación.',
    },
  },
  california: {
    title: 'California Rancho',
    surface: '47.61 ha',
    summary: {
      en: 'Coastal parcel with existing structures; features subject to verification.',
      es: 'Predio costero con 1.4 km de playa y construcciones existentes; características por confirmar.',
    },
  },
  all: {
    title: 'Combined Offering',
    surface: '693.83 ha',
    summary: {
      en: 'Joint offering of the two parcels, boundaries subject to cadastral verification.',
      es: 'Oferta conjunta de los dos predios privados; linderos sujetos a verificación catastral.',
    },
  },
};

const galleryImages = [
  '/assets/original-seaview.webp',
  '/assets/original-palapa.webp',
  '/assets/original-architecture.webp',
  '/assets/original-arch.webp',
  '/assets/historical-concrete.webp',
  '/assets/real-retouched-cactus-dunes.webp',
  '/assets/architecture-concept.webp',
];

export default function Home() {
  const [lang, setLang] = useState<Lang>('en');
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedParcel, setSelectedParcel] = useState<ParcelId>('all');
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [barsAnimated, setBarsAnimated] = useState(false);
  const [inquiry, setInquiry] = useState({ name: '', email: '', organization: '', message: '' });
  const [inquiryStatus, setInquiryStatus] = useState<string | null>(null);
  const barsRef = useRef<HTMLDivElement>(null);

  const t = previewI18n[lang];

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    const handleScroll = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const y = window.scrollY;
      setScrollProgress(Math.min(1, y / max));
      setScrolled(y > 80);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // IntersectionObserver for reveal elements
  useEffect(() => {
    const elements = document.querySelectorAll(
      '.preview-section h2, .preview-section .preview-picture, .preview-cards .preview-card, .preview-panels .preview-panel, .preview-mosaic img, .preview-contact-grid > div, .preview-map, .preview-sidebar, .preview-facts > div, .preview-section .eyebrow'
    );
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('shown');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
    );

    elements.forEach((el) => {
      el.classList.add('preview-mover');
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // IntersectionObserver for investment bars
  useEffect(() => {
    const target = barsRef.current;
    if (!target) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setBarsAnimated(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.22 }
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  // Lightbox keyboard handler
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightboxImg(null);
        setMenuOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Hola Francisco, me interesa recibir más información sobre El Porvenir.%0A%0A*Nombre:* ${encodeURIComponent(inquiry.name)}%0A*Email:* ${encodeURIComponent(inquiry.email)}%0A*Empresa:* ${encodeURIComponent(inquiry.organization)}%0A*Mensaje:* ${encodeURIComponent(inquiry.message)}`;
    window.open(`https://wa.me/526867013628?text=${text}`, '_blank');
    setInquiryStatus(lang === 'es' ? 'Abriendo WhatsApp...' : 'Opening WhatsApp...');
  };

  return (
    <>
      {/* Top progress indicator */}
      <div
        className="preview-progress"
        aria-hidden="true"
        style={{ transform: `scaleX(${scrollProgress})` }}
      />

      {/* Navigation */}
      <nav className={`preview-nav ${scrolled ? 'preview-scrolled' : ''}`}>
        <a href="#home" className="preview-brand">
          <img src="/assets/emblem.png" alt="El Porvenir" />
          <span>
            EL PORVENIR
            <small>COASTAL LAND INVESTMENT</small>
          </span>
        </a>
        <div className="preview-nav-right">
          <div id="preview-links" className={`preview-links ${menuOpen ? 'open' : ''}`}>
            <a href="#opportunity" onClick={() => setMenuOpen(false)}>
              {t.nav[0]}
            </a>
            <a href="#territory" onClick={() => setMenuOpen(false)}>
              {t.nav[1]}
            </a>
            <a href="#vision" onClick={() => setMenuOpen(false)}>
              {t.nav[2]}
            </a>
            <a href="#gallery" onClick={() => setMenuOpen(false)}>
              {t.nav[3]}
            </a>
            <a href="#investment" onClick={() => setMenuOpen(false)}>
              {t.nav[4]}
            </a>
            <a href="#contact" onClick={() => setMenuOpen(false)}>
              {t.nav[5]}
            </a>
          </div>
          <button
            className="preview-lang"
            id="preview-lang-toggle"
            type="button"
            aria-label="Switch language"
            onClick={() => setLang((prev) => (prev === 'en' ? 'es' : 'en'))}
          >
            <span className={lang === 'en' ? 'active' : ''}>EN</span>
            <span>/</span>
            <span className={lang === 'es' ? 'active' : ''}>ES</span>
          </button>
          <button
            className="preview-menu-toggle"
            id="preview-menu-toggle"
            type="button"
            aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
            aria-controls="preview-links"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </nav>

      {/* 01 Hero */}
      <section id="home" className="preview-hero">
        <div className="inner">
          <span className="eyebrow">{t.heroEyebrow}</span>
          <h1>
            {t.heroTitle}
            <br />
            <em>{t.heroAccent}</em>
          </h1>
          <p>{t.heroDesc}</p>
          <a className="button-gold" href="#opportunity">
            {t.heroBtn}
          </a>
        </div>
        <div className="preview-stats">
          <div>
            <b>693.83 ha</b>
            <small>{lang === 'es' ? 'SUPERFICIE APROX.' : 'APPROX. LAND AREA'}</small>
          </div>
          <div>
            <b>US$7.5M</b>
            <small>{lang === 'es' ? 'PRECIO DE OFERTA' : 'OFFERING PRICE'}</small>
          </div>
        </div>
      </section>

      {/* 02 The Opportunity */}
      <section id="opportunity" className="preview-section">
        <div className="preview-container preview-two">
          <div>
            <span className="eyebrow">{t.opportunityEyebrow}</span>
            <h2>
              {t.opportunityTitle}
              <br />
              <em>{t.opportunityAccent}</em>
            </h2>
            <p>{t.opportunityDesc}</p>
            <div className="preview-facts">
              <div>
                <b>693.83</b>
                <small>{lang === 'es' ? 'HECTÁREAS APROX.' : 'APPROX. HECTARES'}</small>
              </div>
              <div>
                <b>US$7.5M</b>
                <small>{lang === 'es' ? 'PRECIO DE OFERTA' : 'OFFERING PRICE'}</small>
              </div>
              <div>
                <b>02</b>
                <small>{lang === 'es' ? 'PREDIOS PRIVADOS' : 'LAND PARCELS'}</small>
              </div>
            </div>
          </div>
          <figure className="preview-picture">
            <img src="/assets/architecture-concept.webp" alt="Concept architecture" />
            <figcaption>
              {lang === 'es'
                ? 'Visualización arquitectónica conceptual — no condición actual.'
                : 'Conceptual architectural visualization — not current condition.'}
            </figcaption>
          </figure>
        </div>
      </section>

      {/* 03 Explore the Territory */}
      <section id="territory" className="preview-section preview-territory">
        <div className="preview-container">
          <div className="preview-center">
            <span className="eyebrow">{t.territoryEyebrow}</span>
            <h2>
              {t.territoryTitle}
              <br />
              <em>{t.territoryAccent}</em>
            </h2>
            <p>{t.territoryDesc}</p>
          </div>
          <div className="preview-territory-grid">
            <div
              className={`preview-map ${
                selectedParcel !== 'all' ? `focus-${selectedParcel}` : ''
              }`}
            >
              <img src="/assets/territory-reference.webp" alt="Concept map" />
              <span className="preview-tag">
                {lang === 'es'
                  ? 'MAPA ILUSTRATIVO · LINDEROS NO CATASTRALES'
                  : 'ILLUSTRATIVE MAP · NOT SURVEYED BOUNDARIES'}
              </span>
            </div>
            <div className="preview-sidebar">
              <span className="eyebrow">
                {lang === 'es' ? 'PERFIL DEL PREDIO' : 'PARCEL PROFILE'}
              </span>
              <h3 id="preview-parcel">{parcelData[selectedParcel].title}</h3>
              <p
                id="preview-surface"
                style={{ font: '36px Georgia, serif', color: '#e2c799' }}
              >
                {parcelData[selectedParcel].surface}
              </p>
              <p id="preview-summary">{parcelData[selectedParcel].summary[lang]}</p>
              <button
                type="button"
                className={selectedParcel === 'baja' ? 'active' : ''}
                onClick={() => setSelectedParcel('baja')}
              >
                Baja Land — 646.21 ha
              </button>
              <button
                type="button"
                className={selectedParcel === 'california' ? 'active' : ''}
                onClick={() => setSelectedParcel('california')}
              >
                California Rancho — 47.61 ha
              </button>
              <button
                type="button"
                className={selectedParcel === 'all' ? 'active' : ''}
                onClick={() => setSelectedParcel('all')}
              >
                {lang === 'es' ? 'Oferta conjunta — 693.83 ha' : 'Combined Offering — 693.83 ha'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 04 Development Vision */}
      <section id="vision" className="preview-section preview-dark">
        <div className="preview-container">
          <span className="eyebrow">{t.visionEyebrow}</span>
          <h2>
            {t.visionTitle}
            <br />
            <em>{t.visionAccent}</em>
          </h2>
          <p>{t.visionDesc}</p>
          <div className="preview-cards">
            <div className="preview-card">
              <img src="/assets/vision-resort.webp" alt="Concept resort" />
              <div>
                <span className="eyebrow">01 / CONCEPTUAL</span>
                <h3>{lang === 'es' ? 'Hospitalidad boutique' : 'Boutique hospitality'}</h3>
                <p>
                  {lang === 'es'
                    ? 'Un concepto de hospitalidad boutique en estrecho contacto con el mar y la naturaleza.'
                    : 'A boutique hospitality concept connected to nature and the sea.'}
                </p>
              </div>
            </div>
            <div className="preview-card">
              <img src="/assets/vision-residential.webp" alt="Concept residences" />
              <div>
                <span className="eyebrow">02 / CONCEPTUAL</span>
                <h3>{lang === 'es' ? 'Comunidad residencial' : 'Residential community'}</h3>
                <p>
                  {lang === 'es'
                    ? 'Una visión de baja densidad planificada para un estilo de vida costero.'
                    : 'A considered, lower-density vision for coastal living.'}
                </p>
              </div>
            </div>
            <div className="preview-card">
              <img src="/assets/vision-eco.webp" alt="Concept beach recreation" />
              <div>
                <span className="eyebrow">03 / CONCEPTUAL</span>
                <h3>{lang === 'es' ? 'Naturaleza y recreación' : 'Nature & recreation'}</h3>
                <p>
                  {lang === 'es'
                    ? 'Eco-recreación y bienestar en sintonía con el entorno desértico costero.'
                    : 'Eco-recreation inspired by the coastal environment.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 05 Gallery & Experience */}
      <section id="gallery" className="preview-section">
        <div className="preview-container preview-gallery">
          <div className="preview-mosaic">
            {galleryImages.map((src, i) => (
              <img
                key={i}
                src={src}
                alt="Gallery preview"
                onClick={() => setLightboxImg(src)}
              />
            ))}
          </div>
          <div>
            <span className="eyebrow">{t.galleryEyebrow}</span>
            <h2>
              {t.galleryTitle}
              <br />
              <em>{t.galleryAccent}</em>
            </h2>
            <p>{t.galleryDesc}</p>
            <p
              style={{
                fontSize: '12px',
                color: '#745d40',
                borderLeft: '2px solid #CFBD99',
                padding: '10px 14px',
                background: '#f6eedf',
              }}
            >
              {lang === 'es'
                ? 'La fotografía de cactáceas y dunas fue retocada digitalmente con IA para fines de presentación. No acredita la condición actual de la propiedad.'
                : 'The cactus-and-dunes photograph was digitally retouched with AI for presentation. It does not verify the current condition of the property.'}
            </p>
            <p>
              <strong>WAVES</strong> &nbsp;{' '}
              {lang === 'es' ? 'Ambiente costero' : 'Coastal setting'}
            </p>
            <hr />
            <p>
              <strong>DESERT</strong> &nbsp;{' '}
              {lang === 'es' ? 'Paisaje desértico natural' : 'Natural surroundings'}
            </p>
            <hr />
            <p>
              <strong>STRUCTURES</strong> &nbsp;{' '}
              {lang === 'es' ? 'Construcciones existentes' : 'Existing architecture'}
            </p>
          </div>
        </div>
      </section>

      {/* 06 Investment Overview */}
      <section id="investment" className="preview-section preview-finance">
        <div className="preview-container">
          <div className="preview-center">
            <span className="eyebrow">{t.investmentEyebrow}</span>
            <h2>
              {t.investmentTitle}
              <br />
              <em>{t.investmentAccent}</em>
            </h2>
            <p>{t.investmentDesc}</p>
          </div>
          <div className="preview-panels">
            <div className="preview-panel">
              <div className="preview-value-card">
                <span className="eyebrow">
                  {lang === 'es'
                    ? 'ANÁLISIS COMPARATIVO DE VALOR'
                    : 'COMPARATIVE VALUE ANALYSIS'}
                </span>
                <h3>
                  {lang === 'es'
                    ? 'Precio de venta vs. avalúos de referencia'
                    : 'Sale price vs. reference appraisals'}
                </h3>
                <p className="preview-value-lead">
                  {lang === 'es'
                    ? 'Referencias documentales frente al precio de oferta.'
                    : 'Documentary references compared with the offering price.'}
                </p>
                <div className="preview-value-rows" ref={barsRef}>
                  <div className="preview-value-item">
                    <div className="preview-value-head">
                      <span>
                        {lang === 'es'
                          ? 'Avalúo aportado · junio 2026'
                          : 'Supplied appraisal · June 2026'}
                      </span>
                      <b>
                        MXN $2,081,569,914 <small>≈ US$104M*</small>
                      </b>
                    </div>
                    <div className="preview-value-track">
                      <span
                        className="preview-value-fill tone-navy"
                        style={{
                          width: '100%',
                          transform: barsAnimated ? 'scaleX(1)' : 'scaleX(0)',
                          transition: 'transform 1.25s cubic-bezier(.22,1,.36,1)',
                        }}
                      />
                    </div>
                    <p>
                      {lang === 'es'
                        ? 'Documento parcial; metodología por verificar.'
                        : 'Partial report; methodology still to be verified.'}
                    </p>
                  </div>
                  <div className="preview-value-item">
                    <div className="preview-value-head">
                      <span>
                        {lang === 'es'
                          ? 'Avalúos históricos · julio 2019'
                          : 'Historical appraisals · July 2019'}
                      </span>
                      <b>US$42,479,000</b>
                    </div>
                    <div className="preview-value-track">
                      <span
                        className="preview-value-fill tone-slate"
                        style={{
                          width: '40.84%',
                          transform: barsAnimated ? 'scaleX(1)' : 'scaleX(0)',
                          transition:
                            'transform 1.25s cubic-bezier(.22,1,.36,1) 0.175s',
                        }}
                      />
                    </div>
                    <p>
                      {lang === 'es'
                        ? 'Referencia histórica; no indica valor de mercado actual.'
                        : 'Dated reference; not a current market value.'}
                    </p>
                  </div>
                  <div className="preview-value-item tone-offer">
                    <div className="preview-value-head">
                      <span>
                        {lang === 'es'
                          ? 'Precio de venta directa · El Porvenir'
                          : 'Direct sale offering · El Porvenir'}
                      </span>
                      <b>
                        US$7,500,000 <small>≈ US$1.08/m²</small>
                      </b>
                    </div>
                    <div className="preview-value-track">
                      <span
                        className="preview-value-fill tone-gold"
                        style={{
                          width: '7.21%',
                          transform: barsAnimated ? 'scaleX(1)' : 'scaleX(0)',
                          transition:
                            'transform 1.25s cubic-bezier(.22,1,.36,1) 0.35s',
                        }}
                      />
                    </div>
                    <p>
                      {lang === 'es'
                        ? 'Dos predios privados · aprox. 693.83 ha.'
                        : 'Two private parcels · approx. 693.83 ha.'}
                    </p>
                  </div>
                </div>
                <p className="preview-value-disclaimer">
                  {lang === 'es'
                    ? '* Equivalencia aproximada en USD indicada en el material aportado, no tipo de cambio actual. Las barras comparan fechas y metodologías distintas; no indican descuento garantizado, valor actual ni rentabilidad.'
                    : '* Approximate USD equivalent as stated in supplied material, not a current FX rate. Bars compare different dates and methodologies; they do not imply a guaranteed discount, current valuation, or investment return.'}
                </p>
                <div className="preview-value-footer">
                  <span>
                    693.83 ha{' '}
                    <small>{lang === 'es' ? 'APROX.' : 'APPROX.'}</small>
                  </span>
                  <span>
                    02 <small>{lang === 'es' ? 'PREDIOS' : 'PARCELS'}</small>
                  </span>
                </div>
              </div>
            </div>
            <div className="preview-panel dark">
              <span className="eyebrow">
                {lang === 'es'
                  ? 'FINANCIAMIENTO DIRECTO DEL PROPIETARIO'
                  : 'DIRECT OWNER FINANCING'}
              </span>
              <h3>
                {lang === 'es'
                  ? 'Propuesta de tres pagos'
                  : 'Three-payment proposal'}
              </h3>
              <p style={{ color: '#d1ded9' }}>
                {lang === 'es'
                  ? 'Montos específicos, plazos, transmisión de dominio y garantías deben acordarse por escrito.'
                  : 'Specific amounts, timing, title transfer and safeguards must be agreed in writing.'}
              </p>
              <div className="preview-installment">
                <b>
                  {lang === 'es'
                    ? '01 · APERTURA Y CONTRATO'
                    : '01 · AGREEMENT STAGE'}
                </b>
                <div>{lang === 'es' ? 'Monto y términos por acordar' : 'Amount to be agreed'}</div>
              </div>
              <div className="preview-installment">
                <b>
                  {lang === 'es'
                    ? '02 · PAGO INTERMEDIO'
                    : '02 · INTERMEDIATE STAGE'}
                </b>
                <div>{lang === 'es' ? 'Monto y calendario por acordar' : 'Amount to be agreed'}</div>
              </div>
              <div className="preview-installment">
                <b>
                  {lang === 'es'
                    ? '03 · CIERRE Y ESCRITURACIÓN'
                    : '03 · CLOSING'}
                </b>
                <div>{lang === 'es' ? 'Monto y condiciones de cierre' : 'Amount to be agreed'}</div>
              </div>
              <a href="#contact" className="button-gold">
                {lang === 'es' ? 'Solicitar condiciones de pago →' : 'Request payment terms →'}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 07 Contact */}
      <section id="contact" className="preview-section preview-contact">
        <div className="preview-container">
          <div className="preview-contact-grid">
            <div>
              <span className="eyebrow">{t.contactEyebrow}</span>
              <h2>
                {t.contactTitle}
                <br />
                <em>{t.contactAccent}</em>
              </h2>
              <p style={{ color: '#e7ece8' }}>{t.contactDesc}</p>
              <p>
                <strong>Francisco Reynoso</strong>
                <br />
                Reynoso & Asociados
                <br />
                +52 686 701 3628
              </p>
              <a
                className="button-gold"
                href="https://wa.me/526867013628"
                target="_blank"
                rel="noopener noreferrer"
              >
                {lang === 'es'
                  ? 'Contactar a Francisco en WhatsApp →'
                  : 'Contact Francisco on WhatsApp →'}
              </a>
            </div>
            <div className="preview-panel">
              <h3 style={{ color: '#fff' }}>
                {lang === 'es' ? 'Presentación privada' : 'Private presentation'}
              </h3>
              <p style={{ color: '#d1dddc' }}>
                {lang === 'es'
                  ? 'Envía tu consulta directa para recibir el dossier confidencial de inversión.'
                  : 'Submit your inquiry to receive confidential investment documentation.'}
              </p>
              <form onSubmit={handleInquirySubmit}>
                <input
                  name="name"
                  placeholder={lang === 'es' ? 'Nombre completo' : 'Full Name'}
                  required
                  value={inquiry.name}
                  onChange={(e) => setInquiry({ ...inquiry, name: e.target.value })}
                />
                <input
                  name="email"
                  type="email"
                  placeholder={lang === 'es' ? 'Correo electrónico' : 'Email address'}
                  required
                  value={inquiry.email}
                  onChange={(e) => setInquiry({ ...inquiry, email: e.target.value })}
                />
                <input
                  name="organization"
                  placeholder={
                    lang === 'es' ? 'Empresa u Organización' : 'Company / Organization'
                  }
                  value={inquiry.organization}
                  onChange={(e) =>
                    setInquiry({ ...inquiry, organization: e.target.value })
                  }
                />
                <textarea
                  rows={3}
                  placeholder={
                    lang === 'es'
                      ? 'Interés de inversión o mensaje'
                      : 'Investment interests / message'
                  }
                  value={inquiry.message}
                  onChange={(e) => setInquiry({ ...inquiry, message: e.target.value })}
                />
                <button
                  type="submit"
                  className="button-gold"
                  style={{ width: '100%', justifyContent: 'center', border: 0 }}
                >
                  {inquiryStatus ||
                    (lang === 'es'
                      ? 'Continuar por WhatsApp →'
                      : 'Continue on WhatsApp →')}
                </button>
              </form>
            </div>
          </div>
          <div className="preview-footer">
            <span>© {new Date().getFullYear()} EL PORVENIR</span>
            <span>Presented by Reynoso & Asociados</span>
            <span>
              {lang === 'es'
                ? 'Material conceptual · requiere verificación independiente'
                : 'Conceptual material · independent verification required'}
            </span>
          </div>
        </div>
      </section>

      {/* Lightbox modal */}
      {lightboxImg && (
        <div
          id="lightbox"
          className="preview-gallery-modal show"
          onClick={() => setLightboxImg(null)}
        >
          <button
            type="button"
            aria-label="Close"
            onClick={() => setLightboxImg(null)}
          >
            ×
          </button>
          <img
            src={lightboxImg}
            alt="Gallery expanded"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
