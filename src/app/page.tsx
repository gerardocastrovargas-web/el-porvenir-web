'use client';
import {useEffect,useState} from 'react';
import {useCinematicScroll} from '@/lib/useCinematicScroll';
import {ArrowDown,ArrowRight,ArrowUpRight,ChevronLeft,ChevronRight,MapPin,Menu,Phone,ShieldCheck,Sun,Waves,X,Landmark,FileText,Compass,ExternalLink} from 'lucide-react';
import TerritoryMap from '@/components/TerritoryMap';
import InvestorForm from '@/components/InvestorForm';
import ValueComparison from '@/components/ValueComparison';
import {copy,type Lang} from '@/lib/content';
const phone=process.env.NEXT_PUBLIC_CONTACT_WHATSAPP||'526867013628';
const whatsapp=`https://wa.me/${phone}`;
const galleryAssets=[
  {src:'/assets/original-seaview.webp',concept:false},
  {src:'/assets/original-palapa.webp',concept:false},
  {src:'/assets/original-architecture.webp',concept:false},
  {src:'/assets/original-arch.webp',concept:false},
  {src:'/assets/historical-concrete.webp',concept:false},
  {src:'/assets/real-retouched-cactus-dunes.webp',concept:false,retouched:true},
  {src:'/assets/architecture-concept.webp',concept:true},
];
function Brand({light=false}:{light?:boolean}){return <a className={'brand '+(light?'brand-light':'')} href="#home" aria-label="El Porvenir, inicio"><img src="/assets/emblem.png" alt=""/><span className="brand-words"><strong>EL PORVENIR</strong><small>COASTAL LAND INVESTMENT</small></span></a>}
function SectionHeader({k,title,accent,description}: {k:string;title:string;accent:string;description?:string}){return <div className="section-header reveal"><div className="eyebrow with-line">{k}</div><h2 className="display-title"><span className="title-first">{title}</span> <em>{accent}</em></h2>{description&&<p className="section-intro">{description}</p>}</div>}
function InfoIcon({type}:{type:'sea'|'sun'|'shield'}){return type==='sea'?<Waves/>:type==='sun'?<Sun/>:<ShieldCheck/>}
export default function Home(){
 const [lang,setLang]=useState<Lang>('en');const t=copy[lang];
 const [menuOpen,setMenuOpen]=useState(false);
 const [lightbox,setLightbox]=useState<number|null>(null);
 useCinematicScroll(lang);
 useEffect(()=>{document.documentElement.lang=lang;},[lang]);
 useEffect(()=>{
  const key=(e:KeyboardEvent)=>{if(e.key==='Escape'){setLightbox(null);setMenuOpen(false)}if(lightbox!==null&&e.key==='ArrowRight')setLightbox((lightbox+1)%galleryAssets.length);if(lightbox!==null&&e.key==='ArrowLeft')setLightbox((lightbox+galleryAssets.length-1)%galleryAssets.length)};
  window.addEventListener('keydown',key);return()=>window.removeEventListener('keydown',key);
 },[lightbox]);
 const moveLightbox=(delta:number)=>setLightbox(v=>v===null?null:(v+galleryAssets.length+delta)%galleryAssets.length);
 return <>
 <div className="scroll-progress" aria-hidden="true"/><header className="site-nav"><div className="nav-inner shell"><Brand light/><nav id="site-main-menu" className={'main-menu '+(menuOpen?'open':'')} aria-label="Site navigation">{t.nav.map((n,i)=><a key={i} href={'#'+['opportunity','territory','vision','gallery','investment','contact'][i]} onClick={()=>setMenuOpen(false)}>{n}</a>)}</nav><div className="nav-end"><button className="language-switch" aria-label={lang==='en'?'Switch to Spanish':'Cambiar a inglés'} onClick={()=>setLang(v=>v==='en'?'es':'en')}><span className={"language-option "+(lang==='en'?'active':'')}>EN</span><span className="language-divider">/</span><span className={"language-option "+(lang==='es'?'active':'')}>ES</span></button><a href="#contact" className="nav-action"><ArrowUpRight size={17}/></a><button className="menu-button" aria-label={menuOpen?'Close navigation':'Open navigation'} onClick={()=>setMenuOpen(v=>!v)} aria-expanded={menuOpen} aria-controls="site-main-menu">{menuOpen?<X/>:<Menu/>}</button></div></div></header>
 <main>
  <section id="home" className="hero-section">
   <div className="hero-parallax" style={{backgroundImage:'url(/assets/hero-concept.webp)'}}/>
   <div className="hero-shade"/>
   <div className="hero-grain"/>
   <div className="hero-content shell">
    <div className="hero-copy"><div className="eyebrow hero-eyebrow reveal"><span className="line"/>{t.heroEyebrow}</div>
     <h1 className="hero-title reveal"><span className="hero-line">{t.heroTitle}</span><span className="hero-line"><em>{t.heroAccent}</em></span></h1>
     <p className="hero-desc reveal">{t.heroDesc}</p>
     <div className="hero-actions reveal"><a href="#opportunity" className="button-gold">{t.heroButton}<ArrowUpRight size={19}/></a><a href="#territory" className="button-ghost">{lang==='es'?'Ver territorio':'View territory'}<ArrowRight size={17}/></a></div>
    </div>
    <div className="hero-bottom"><div className="hero-stat"><b><span data-count="693.83" data-decimals="2">693.83</span> <small>ha</small></b><span>{lang==='es'?'SUPERFICIE APROXIMADA':'APPROXIMATE LAND AREA'}</span></div><div className="hero-stat"><b>US$7.5M</b><span>{lang==='es'?'PRECIO DE OFERTA':'OFFERING PRICE'}</span></div><a className="scroll-cue" href="#opportunity">{t.heroScroll}<ArrowDown size={17}/></a></div>
   </div>
   <div className="concept-pill">{lang==='es'?'Paisaje conceptual · no fotografía catastral':'Concept landscape · not cadastral photography'}</div>
  </section>
  <section id="opportunity" className="section opportunity-section ivory-section"><div className="shell opportunity-grid">
    <div className="opportunity-copy"><SectionHeader k={t.opportunityEyebrow} title={t.opportunityTitle} accent={t.opportunityAccent} description={t.opportunityDesc}/>
      <div className="opportunity-metrics reveal"><div><b><span data-count="693.83" data-decimals="2">693.83</span></b><span>{lang==='es'?'HECTÁREAS APROX.':'APPROX. HECTARES'}</span></div><div><b>US$7.5M</b><span>{lang==='es'?'PRECIO DE OFERTA':'OFFERING PRICE'}</span></div><div><b><span data-count="2" data-decimals="0" data-pad="2">02</span></b><span>{lang==='es'?'PREDIOS PRIVADOS':'PRIVATE PARCELS'}</span></div></div>
      <p className="support-line reveal"><Compass size={18}/>{lang==='es'?'San Felipe, Baja California · Golfo de California':'San Felipe, Baja California · Gulf of California'}</p>
      <a className="inline-link reveal" href="#investment">{lang==='es'?'Conocer la oferta':'Explore investment terms'}<ArrowUpRight size={18}/></a>
    </div>
    <div className="photo-frame reveal"><div className="photo-viewport"><img src="/assets/architecture-concept.webp" className="rise-photo" alt="Conceptual visualization of a finished coastal residence" loading="lazy"/></div><div className="photo-caption"><span>{t.opportunityNote}</span><span className="decorative-line"/></div></div>
  </div></section>
  <section id="territory" className="section territory-section ivory-section"><div className="shell territory-shell"><SectionHeader k={t.territoryEyebrow} title={t.territoryTitle} accent={t.territoryAccent} description={t.territoryDesc}/><TerritoryMap lang={lang}/></div></section>
  <section id="vision" className="section vision-section"><div className="shell"><div className="vision-intro"><SectionHeader k={t.visionEyebrow} title={t.visionTitle} accent={t.visionAccent} description={t.visionDesc}/><div className="vision-signet" aria-hidden="true"><img src="/assets/emblem.png" alt=""/></div></div>
    <div className="vision-stage"><div className="vision-grid">{(['vision-resort.webp','vision-residential.webp','vision-eco.webp'] as const).map((asset,i)=><article className="vision-card reveal" key={asset}><div className="vision-image"><img src={'/assets/'+asset} alt={t.visionCards[i].title} loading="lazy"/></div><div className="vision-body"><span className="vision-index">0{i+1} / {lang==='es'?'ESCENARIO CONCEPTUAL':'CONCEPT SCENARIO'}</span><h3>{t.visionCards[i].title}</h3><p>{t.visionCards[i].sub}</p><small>{t.labelConcept}</small></div></article>)}</div><div className="vision-progress-track" aria-hidden="true"><div className="vision-progress-fill"/></div></div>
    <p className="disclaimer light-disclaimer">{lang==='es'?'Todos los usos de suelo, obras y desarrollos propuestos requieren estudios y autorizaciones aplicables. No son proyectos existentes.':'All proposed uses, structures, and developments require applicable feasibility studies and approvals. These are not existing projects.'}</p>
  </div></section>
  <section id="gallery" className="section gallery-section ivory-section"><div className="shell gallery-grid"><div className="gallery-mosaic reveal">{galleryAssets.map((it,i)=><button className={'gallery-tile gallery-tile-'+i} key={it.src} onClick={()=>setLightbox(i)} aria-label={`${t.galleryLabels[i]} - ${lang==='es'?'Ampliar':'Enlarge'}`}><img src={it.src} alt={t.galleryLabels[i]} loading="lazy"/><span className="tile-caption">{t.galleryLabels[i]} <ArrowUpRight size={16}/></span>{it.concept&&<span className="tile-concept">{t.labelConcept}</span>}{it.retouched&&<span className="tile-concept tile-retouched">{t.labelRetouched}</span>}</button>)}</div>
    <div className="gallery-copy"><SectionHeader k={t.galleryEyebrow} title={t.galleryTitle} accent={t.galleryAccent} description={t.galleryDesc}/><div className="gallery-feature reveal"><Waves/><div><h3>{lang==='es'?'Ambiente costero':'Coastal setting'}</h3><p>{lang==='es'?'Vistas abiertas al Golfo de California.':'Open views toward the Gulf of California.'}</p></div></div><div className="gallery-feature reveal"><Sun/><div><h3>{lang==='es'?'Paisaje desértico':'Desert landscape'}</h3><p>{lang==='es'?'El carácter del desierto es parte esencial de la experiencia.':'The desert environment is a defining part of the setting.'}</p></div></div><div className="gallery-feature reveal"><Landmark/><div><h3>{lang==='es'?'Construcciones existentes':'Existing structures'}</h3><p>{lang==='es'?'Fotografías históricas, sujetas a actualización en sitio.':'Historical photographs, pending current on-site updates.'}</p></div></div></div></div></section>
  <section id="investment" className="section investment-section ivory-section"><div className="shell"><div className="investment-top"><SectionHeader k={t.financeEyebrow} title={t.financeTitle} accent={t.financeAccent} description={t.financeDesc}/></div><div className="investment-grid"><article className="valuation-panel reveal"><ValueComparison lang={lang}/><div className="value-panel-footer"><span>{t.financeHectares}<b>693.83 ha</b></span><span>{t.financePlots}<b>02</b></span></div></article>
      <article className="terms-panel reveal"><div className="eyebrow">DIRECT OWNER FINANCING · SUBJECT TO AGREEMENT</div><h3>{t.financeTerms}</h3><p>{t.financeTermsDesc}</p><div className="installment-list">{[1,2,3].map(n=><div className="installment" key={n}><span className="installment-number">0{n}</span><div><b>{lang==='es'?['Apertura y contrato','Pago intermedio','Cierre y escrituración'][n-1]:['Agreement stage','Intermediate installment','Closing and title transfer'][n-1]}</b><small>{lang==='es'?'Monto y calendario por acordar':'Amount and schedule to be agreed'}</small></div><FileText size={19}/></div>)}</div><a href="#contact" className="button-gold terms-cta">{t.financeTermsBtn}<ArrowUpRight size={19}/></a></article></div><p className="disclaimer dark-disclaimer">{t.financeNote}</p></div></section>
  <section id="contact" className="contact-section"><div className="contact-backdrop"/><div className="contact-overlay"/><div className="shell contact-inner"><div className="contact-main"><div className="contact-left"><span className="eyebrow with-line">{t.contactEyebrow}</span><div className="contact-brand"><Brand light/></div><h2 className="contact-heading">{t.contactTitle}<br/><em>{t.contactAccent}</em></h2><p>{t.contactDesc}</p><div className="direct-contacts"><span className="eyebrow">{t.contactDirect}</span><a href={whatsapp} target="_blank" rel="noopener noreferrer"><Phone size={19}/>+52 686 701 3628<ExternalLink size={14}/></a><div><MapPin size={19}/>{t.contactLocation}</div><span>Francisco Reynoso · Reynoso & Asociados</span></div></div><div className="contact-right"><div className="contact-panel"><span className="eyebrow">PRIVATE INVESTMENT INQUIRY</span><h3>{lang==='es'?'Solicita una presentación privada':'Request a private presentation'}</h3><InvestorForm lang={lang}/></div></div></div><footer className="footer"><span>© {new Date().getFullYear()} EL PORVENIR</span><span>{t.rights}</span><span>{t.footerNote}</span></footer></div></section>
 </main>
 {lightbox!==null&&<div className="lightbox" role="dialog" aria-modal="true" aria-label={t.galleryLabels[lightbox]} onClick={()=>setLightbox(null)}><button className="lightbox-close" aria-label="Close gallery" onClick={()=>setLightbox(null)}><X/></button><button className="lightbox-arrow prev" aria-label="Previous photo" onClick={e=>{e.stopPropagation();moveLightbox(-1)}}><ChevronLeft/></button><figure onClick={e=>e.stopPropagation()}><img src={galleryAssets[lightbox].src} alt={t.galleryLabels[lightbox]}/><figcaption>{t.galleryLabels[lightbox]} — {galleryAssets[lightbox].concept?t.galleryConcept:galleryAssets[lightbox].retouched?t.galleryRetouched:t.galleryActual}</figcaption></figure><button className="lightbox-arrow next" aria-label="Next photo" onClick={e=>{e.stopPropagation();moveLightbox(1)}}><ChevronRight/></button></div>}
 </>;
}
