'use client';
import {useState,type FormEvent} from 'react';
import {ArrowUpRight,CheckCircle2,LoaderCircle} from 'lucide-react';
import {copy,type Lang} from '@/lib/content';
export default function InvestorForm({lang}:{lang:Lang}){
 const t=copy[lang];const [status,setStatus]=useState<'idle'|'loading'|'success'|'unconfigured'|'error'>('idle');
 const phone=process.env.NEXT_PUBLIC_CONTACT_WHATSAPP||'526867013628';
 const waText=lang==='es'?'Hola Francisco, me interesa solicitar una presentación privada de El Porvenir.':'Hello Francisco, I would like a private presentation of El Porvenir.';
 const whatsapp=`https://wa.me/${phone}?text=${encodeURIComponent(waText)}`;
 async function submit(e:FormEvent<HTMLFormElement>){
  e.preventDefault();if(status==='loading')return;
  setStatus('loading');const form=e.currentTarget;const data=Object.fromEntries(new FormData(form).entries());
  try{const resp=await fetch('/api/inquiry',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});if(resp.ok){setStatus('success');form.reset();}else if(resp.status===503){setStatus('unconfigured');}else{setStatus('error')}}catch{setStatus('error')}
 }
 return <form className="inquiry-form" onSubmit={submit}>
   <div className="form-two"><label>{t.contactName}<input autoComplete="name" name="name" minLength={2} maxLength={100} required placeholder={lang==='es'?'Tu nombre':'Your name'}/></label><label>{t.contactEmail}<input name="email" type="email" autoComplete="email" required maxLength={180} placeholder="name@company.com"/></label></div>
   <label>{t.contactOrg}<input name="organization" maxLength={160} placeholder={lang==='es'?'Nombre de empresa':'Company name'}/></label>
   <label>{t.contactMessage}<textarea name="message" maxLength={1500} rows={3} placeholder={lang==='es'?'Cuéntanos brevemente tu interés':'Tell us briefly about your interest'}/></label>
   <div className="honeypot" aria-hidden="true"><label>{t.contactHoneypot}<input name="website" tabIndex={-1} autoComplete="off"/></label></div>
   <button className="button-gold form-submit" type="submit" disabled={status==='loading'}>{status==='loading'?<LoaderCircle className="spin" size={18}/>:<ArrowUpRight size={18}/>} {t.contactSubmit}</button>
   {status==='success'&&<p className="form-feedback success" role="status"><CheckCircle2 size={16}/>{t.contactSuccess}</p>}
   {status==='unconfigured'&&<p className="form-feedback" role="status">{t.contactPending} <a href={whatsapp} target="_blank" rel="noopener noreferrer">{t.contactWhatsApp} ↗</a></p>}
   {status==='error'&&<p className="form-feedback" role="alert">{t.contactError} <a href={whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp ↗</a></p>}
   <small className="privacy-note">{t.contactPrivacy}</small>
 </form>;
}
