"use client";
import type {Lang} from '@/lib/content';

/**
 * Presentation-only proportional values. The approx. USD equivalent for the
 * partial 2026 reference is taken from the supplied investment material,
 * NOT calculated from a live FX rate. The figures are historical, dated
 * differently, and do not substantiate an investment discount/return.
 */
const values = [
  {id:'2026', width:100, figure:'MXN $2,081,569,914', approx:'≈ US$104M*', tone:'navy'},
  {id:'2019', width:40.84, figure:'US$42,479,000', approx:'', tone:'slate'},
  {id:'offer', width:7.21, figure:'US$7,500,000', approx:'≈ US$1.08/m²', tone:'gold'},
] as const;

export default function ValueComparison({lang}:{lang:Lang}){
  const es=lang==='es';
  const heading=es?'Precio de venta vs. avalúos de referencia':'Sale price vs. reference appraisals';
  const lines=es?[
    {label:'Avalúo aportado · junio 2026',description:'Cifra indicada en documento parcial; alcance y metodología por verificar.'},
    {label:'Avalúos históricos · julio 2019',description:'Suma de referencias del expediente; no equivale a valor de mercado vigente.'},
    {label:'Precio de venta directa · El Porvenir',description:'Oferta conjunta de dos predios privados · aprox. 693.83 hectáreas.'},
  ]:[
    {label:'Supplied appraisal · June 2026',description:'Figure from a partial document; scope and methodology unverified.'},
    {label:'Historical appraisals · July 2019',description:'Combined references in the file; not a current market valuation.'},
    {label:'Direct sale offering · El Porvenir',description:'Combined offering of two private parcels · approx. 693.83 hectares.'},
  ];
  return <div className="value-comparison" aria-label={heading}>
    <span className="eyebrow value-eyebrow">{es?'ANÁLISIS COMPARATIVO DE VALOR':'COMPARATIVE VALUE ANALYSIS'}</span>
    <h3 className="value-comparison-title">{heading}</h3>
    <p className="value-comparison-intro">{es?'Referencias documentales frente al precio de oferta.':'Documentary valuation references compared with the offering price.'}</p>
    <div className="value-comparison-rows">
      {values.map((v,i)=><div className={'value-comparison-item comparison-'+v.tone} key={v.id}>
        <div className="value-comparison-heading">
          <span className="value-comparison-name">{lines[i].label}</span>
          <strong className="value-comparison-figure">{v.figure}{v.approx&&<small>{v.approx}</small>}</strong>
        </div>
        <div className="value-comparison-track" role="img" aria-label={`${lines[i].label}: ${v.figure}${v.approx?', '+v.approx:''}`}>
          <span className="value-comparison-fill" style={{width:`${v.width}%`}}/>
        </div>
        <p className="value-comparison-caption">{lines[i].description}</p>
      </div>)}
    </div>
    <div className="comparison-method-note"><span aria-hidden="true">✧</span><span>{es
      ?'* Equivalencia aproximada en USD indicada en el material aportado, no tipo de cambio actual. Barras a escala ilustrativa con esa equivalencia; los avalúos provienen de años y metodologías diferentes. No expresan descuento garantizado, ganancia patrimonial ni valuación actual verificada.'
      :'* Approximate USD equivalent stated in supplied materials, not a current FX conversion. Bars are illustrative and scaled using that equivalent; appraisals differ by date and methodology. They do not represent a guaranteed discount, instant equity gain, or verified current valuation.'}</span></div>
  </div>;
}
