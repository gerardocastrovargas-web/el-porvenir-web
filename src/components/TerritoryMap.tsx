'use client';
import {useCallback,useEffect,useRef,useState,type CSSProperties} from 'react';
import {gsap} from 'gsap';
import dynamic from 'next/dynamic';
import {Maximize2,MapPinned,Layers3,Info,ArrowUpRight} from 'lucide-react';
import {copy,parcels,type Lang,type ParcelId} from '@/lib/content';
const VerifiedMap=dynamic(()=>import('./VerifiedMap'),{ssr:false,loading:()=> <div className="map-loading">Loading map…</div>});
export default function TerritoryMap({lang}:{lang:Lang}){
 const t=copy[lang]; const [active,setActive]=useState<ParcelId>('all');
 const detailRef=useRef<HTMLDivElement>(null);
 const isFirstRender=useRef(true);
 useEffect(()=>{
   if(isFirstRender.current){isFirstRender.current=false;return;}
   if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
   const node=detailRef.current;if(!node)return;
   const tweens=[gsap.fromTo(node.querySelectorAll('h3,.territory-number,p:not(.tiny-note),.tiny-note'),{y:12,opacity:.42},{y:0,opacity:1,duration:.48,stagger:.065,ease:'power2.out'})];
   return ()=>tweens.forEach(t=>t.kill());
 },[active]);
 const onSelect=useCallback((id:ParcelId)=>setActive(id),[]);
 const isVerified=process.env.NEXT_PUBLIC_ENABLE_VERIFIED_MAP==='true';
 const current=parcels[active];
 return <div className="territory-layout">
   <div className="territory-map-wrap">
    {isVerified?<VerifiedMap active={active} onSelect={onSelect}/>:<div className="territory-illustration">
      <img src="/assets/territory-reference.webp" alt="Illustrative aerial map concept of Baja Land and California Rancho" loading="lazy" />
      <svg className="parcel-hit-zones" viewBox="0 0 1090 675" preserveAspectRatio="none" aria-hidden="true">
        <polygon onClick={()=>onSelect('baja')} className={active==='baja'?'parcel-zone chosen':'parcel-zone'} points="166,99 295,120 477,216 595,260 675,270 714,465 548,485 344,483 181,454"/>
        <polygon onClick={()=>onSelect('california')} className={active==='california'?'parcel-zone california chosen':'parcel-zone california'} points="710,263 770,232 792,315 740,367 706,350"/>
      </svg>
      <div className="map-badge"><MapPinned size={14}/>{lang==='es'?'MAPA CONCEPTUAL':'ILLUSTRATIVE MAP'}</div>
    </div>}
    <button type="button" className="map-expand" title={lang==='es'?'Abrir imagen de referencia':'Open reference image'} onClick={()=>window.open('/assets/territory-reference.webp','_blank','noopener,noreferrer')}><Maximize2 size={18}/></button>
   </div>
   <div className="territory-selector" role="group" aria-label={t.terrMapSelect}>
      {(['all','baja','california'] as ParcelId[]).map(id=><button className={'parcel-tab '+(active===id?'active':'')} key={id} aria-pressed={active===id} onClick={()=>setActive(id)} style={{'--tab-accent':parcels[id].color} as CSSProperties}><span className="parcel-dot"/>{parcels[id].title}</button>)}
   </div>
   <div className="territory-detail" ref={detailRef} aria-live="polite">
      <div className="territory-detail-top"><span className="eyebrow">{lang==='es'?'FICHA DEL PREDIO':'LAND PARCEL PROFILE'}</span><Layers3 size={17}/></div>
      <h3>{current.title}</h3>
      <p className="territory-number">{current.hectares.toFixed(2)} <small>ha</small></p>
      <p>{active==='all'?t.territoryCombined:active==='baja'?t.territoryBaja:t.territoryCalifornia}</p>
      <span className="tiny-note"><Info size={13}/> {t.territoryMapNote}</span>
      <a href="#contact" className="inline-link">{lang==='es'?'Solicitar información':'Request information'} <ArrowUpRight size={16}/></a>
   </div>
 </div>;
}
