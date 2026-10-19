'use client';
import {useEffect,useRef} from 'react';
import type {ParcelId} from '@/lib/content';
import type {StyleSpecification} from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
interface Props { active:ParcelId; onSelect:(id:ParcelId)=>void; }
/** Only mounts when verified WGS84 GeoJSON exists and the feature flag is explicitly on. */
export default function VerifiedMap({active,onSelect}:Props){
 const root=useRef<HTMLDivElement>(null);
 useEffect(()=>{
  let disposed=false; let destroy:(()=>void)|undefined;
  (async()=>{
   const resp=await fetch('/data/parcels.geojson',{cache:'no-store'});
   if(!resp.ok) return;
   const geo=await resp.json();
   if(!Array.isArray(geo.features)||!geo.features.length) return;
   if(geo.features.some((f:{geometry?:{type?:string};properties?:{id?:string}})=>f.geometry?.type!=='Polygon'&&f.geometry?.type!=='MultiPolygon'||!['baja','california'].includes(f.properties?.id||'')))return;
   const maplibre=(await import('maplibre-gl')).default;
   if(disposed||!root.current)return;
   const map=new maplibre.Map({
    container:root.current,
    style:process.env.NEXT_PUBLIC_MAP_STYLE_URL||({version:8,sources:{osm:{type:'raster',tiles:['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],tileSize:256,attribution:'© OpenStreetMap contributors'}},layers:[{id:'osm',type:'raster',source:'osm'}]} as StyleSpecification),
    center:[-114.8,30.7],zoom:9,
   });
   map.addControl(new maplibre.NavigationControl(),'top-right');
   map.on('load',()=>{
    if(disposed)return;
    map.addSource('parcels',{type:'geojson',data:geo});
    map.addLayer({id:'parcel-fill',type:'fill',source:'parcels',paint:{'fill-color':['match',['get','id'],'baja','#CFBD99','california','#B47654','#8FA59B'],'fill-opacity':['case',['==',['get','id'],active],.56,.24]}});
    map.addLayer({id:'parcel-outline',type:'line',source:'parcels',paint:{'line-color':'#F5F0E8','line-width':3}});
    map.on('click','parcel-fill',e=>{const id=e.features?.[0]?.properties?.id;if(id==='baja'||id==='california')onSelect(id);});
    const coords:number[][]=[];
    for(const f of geo.features){const g=f.geometry;const list=g.type==='Polygon'?[g.coordinates]:g.coordinates;for(const poly of list)for(const ring of poly)for(const pt of ring)coords.push(pt);}
    if(coords.length){const xs=coords.map(c=>c[0]),ys=coords.map(c=>c[1]);map.fitBounds([[Math.min(...xs),Math.min(...ys)],[Math.max(...xs),Math.max(...ys)]],{padding:45,duration:0});}
   });
   destroy=()=>map.remove();
  })().catch(()=>{});
  return ()=>{disposed=true;destroy?.()};
 },[onSelect]);
 useEffect(()=>{
  const rootElement=root.current;if(!rootElement)return;
  // The selected parcel is always highlighted in the accompanying cards.
 },[active]);
 return <div ref={root} className="maplibre-canvas" aria-label="Verified interactive territorial map"/>;
}
