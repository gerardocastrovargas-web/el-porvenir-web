"use client";
/**
 * El Porvenir · Cinematic motion v2.4
 * All effects are optional progressive enhancements: readable without JS,
 * reduced-motion friendly, scoped with GSAP matchMedia and cleaned on unmount.
 * Language switching refreshes layout but DOES NOT replay the intro animation.
 */
import {useEffect} from 'react';
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import type {Lang} from './content';

export function useCinematicScroll(lang:Lang){
  useEffect(()=>{
    gsap.registerPlugin(ScrollTrigger);
    const mm=gsap.matchMedia();
    const refresh=()=>ScrollTrigger.refresh();
    const onMotionChange=()=>refresh();
    const images=Array.from(document.querySelectorAll<HTMLImageElement>('main img'));
    let frame=0;

    mm.add({
      motion:'(prefers-reduced-motion: no-preference)',
      desktop:'(min-width: 960px) and (hover: hover) and (pointer: fine)',
    },(ctx)=>{
      if(!ctx.conditions?.motion)return;
      const desktop=Boolean(ctx.conditions.desktop);
      const hero=document.querySelector<HTMLElement>('#home');
      if(!hero)return;

      // Intro plays only once; breakpoints changing must not restart it.
      if(!hero.dataset.introPlayed){
        hero.dataset.introPlayed='true';
        gsap.timeline({defaults:{ease:'power3.out'}})
          .fromTo('.site-nav',{y:-20,autoAlpha:0},{y:0,autoAlpha:1,duration:.75})
          .fromTo('.hero-eyebrow',{y:22,autoAlpha:0},{y:0,autoAlpha:1,duration:.75},'-=.38')
          .fromTo('.hero-line',{yPercent:85,autoAlpha:0},{yPercent:0,autoAlpha:1,duration:1.05,stagger:.14},'-=.39')
          .fromTo('.hero-desc',{y:25,autoAlpha:0},{y:0,autoAlpha:1,duration:.75},'-=.53')
          .fromTo('.hero-actions',{y:21,autoAlpha:0},{y:0,autoAlpha:1,duration:.70},'-=.40')
          .fromTo('.hero-bottom',{y:24,autoAlpha:0},{y:0,autoAlpha:1,duration:.75},'-=.50')
          .fromTo('.concept-pill',{autoAlpha:0},{autoAlpha:1,duration:.55},'-=.28');
      }

      gsap.fromTo('.hero-parallax',{scale:1.035},{
        scale:desktop?1.16:1.055,yPercent:desktop?8:2,ease:'none',
        scrollTrigger:{trigger:hero,start:'top top',end:'bottom top',scrub:desktop?1.25:.7,invalidateOnRefresh:true}
      });
      gsap.to('.hero-copy',{yPercent:desktop?-10:-3,opacity:desktop?.48:.82,ease:'none',
        scrollTrigger:{trigger:hero,start:'30% top',end:'bottom top',scrub:.9}});
      gsap.to('.scroll-progress',{scaleX:1,ease:'none',scrollTrigger:{trigger:document.documentElement,start:'top top',end:'bottom bottom',scrub:.22}});
      ScrollTrigger.create({start:60,end:'max',onUpdate:self=>document.querySelector('.site-nav')?.classList.toggle('is-scrolled',self.scroll()>60)});

      const reveal=gsap.utils.toArray<HTMLElement>('.section .reveal, .contact-section .reveal');
      reveal.forEach(el=>{
        if(el.closest('.photo-frame,.gallery-mosaic,.vision-card'))return;
        gsap.fromTo(el,{y:desktop?38:19,autoAlpha:0},{y:0,autoAlpha:1,duration:desktop?1.04:.63,ease:'power3.out',clearProps:'transform,opacity,visibility',
          scrollTrigger:{trigger:el,start:'top 92%',once:true}});
      });

      // Image shutters + subtle perspective in the Opportunity section.
      gsap.fromTo('.photo-frame',{clipPath:'inset(7% 5% 7% 5%)',autoAlpha:.5,y:32},
        {clipPath:'inset(0% 0% 0% 0%)',autoAlpha:1,y:0,duration:1.22,ease:'power3.out',clearProps:'transform,opacity,visibility,clipPath',
          scrollTrigger:{trigger:'#opportunity .photo-frame',start:'top 88%',once:true}});
      gsap.fromTo('.opportunity-metrics > div',{y:23,autoAlpha:0},
        {y:0,autoAlpha:1,stagger:.10,duration:.70,ease:'power2.out',clearProps:'transform,opacity,visibility',
          scrollTrigger:{trigger:'.opportunity-metrics',start:'top 91%',once:true}});
      gsap.utils.toArray<HTMLElement>('[data-count]').forEach(el=>{
        const target=Number(el.dataset.count),decimals=Number(el.dataset.decimals||0),pad=Number(el.dataset.pad||0);
        if(!Number.isFinite(target))return;
        const cursor={value:0};
        const fmt=(value:number)=>{const n=value.toFixed(decimals);return pad?n.padStart(pad,'0'):n;};
        ScrollTrigger.create({trigger:el,start:'top 97%',once:true,onEnter:()=>gsap.to(cursor,{value:target,duration:1.5,ease:'power2.out',
          onUpdate:()=>{el.textContent=fmt(cursor.value)},onComplete:()=>{el.textContent=fmt(target)}})});
      });

      // Interactive map controls remain fully functional throughout motion.
      gsap.fromTo('.territory-map-wrap',{autoAlpha:.5,y:22,scale:.987},{autoAlpha:1,y:0,scale:1,duration:1.05,ease:'power2.out',
        clearProps:'transform,opacity,visibility',scrollTrigger:{trigger:'.territory-map-wrap',start:'top 88%',once:true}});
      gsap.fromTo('.territory-selector .parcel-tab',{y:16,autoAlpha:0},{y:0,autoAlpha:1,stagger:.09,duration:.58,ease:'power2.out',
        clearProps:'transform,opacity,visibility',scrollTrigger:{trigger:'.territory-selector',start:'top 93%',once:true}});
      gsap.fromTo('.territory-detail',{y:20,autoAlpha:0},{y:0,autoAlpha:1,duration:.7,ease:'power2.out',
        clearProps:'transform,opacity,visibility',scrollTrigger:{trigger:'.territory-detail',start:'top 94%',once:true}});

      // Development Vision: horizontal pinned editorial story only on fine-pointer desktop.
      // When resized or reduced motion is requested, matchMedia fully reverts this pin.
      const stage=document.querySelector<HTMLElement>('.vision-stage');
      const track=document.querySelector<HTMLElement>('.vision-grid');
      if(desktop&&stage&&track){
        const travel=()=>Math.max(0,track.scrollWidth-stage.clientWidth);
        if(travel()>20){
          gsap.set('.vision-progress-fill',{scaleX:0});
          gsap.to(track,{x:()=>-travel(),ease:'none',scrollTrigger:{trigger:stage,start:'top 14%',
            end:()=>`+=${Math.max(500,travel()*1.35)}`,pin:true,pinSpacing:true,scrub:1.15,
            invalidateOnRefresh:true,anticipatePin:1,onUpdate:self=>gsap.set('.vision-progress-fill',{scaleX:self.progress})}});
        }
      }else{
        gsap.fromTo('.vision-card',{y:26,autoAlpha:0},{y:0,autoAlpha:1,stagger:.11,duration:.75,ease:'power3.out',
          clearProps:'transform,opacity,visibility',scrollTrigger:{trigger:'.vision-grid',start:'top 88%',once:true}});
      }

      gsap.fromTo('.gallery-tile',{y:desktop?44:19,autoAlpha:0},
        {y:0,autoAlpha:1,stagger:desktop?.075:.045,duration:desktop?.87:.55,ease:'power3.out',
          clearProps:'transform,opacity,visibility',scrollTrigger:{trigger:'.gallery-mosaic',start:'top 87%',once:true}});
      gsap.fromTo('.valuation-panel,.terms-panel',{y:33,autoAlpha:0},{y:0,autoAlpha:1,stagger:.13,duration:.92,ease:'power3.out',
        clearProps:'transform,opacity,visibility',scrollTrigger:{trigger:'.investment-grid',start:'top 86%',once:true}});
      // Values animate only upon entry into the investment panel, never on page load.
      // CSS retains the full bars as a safe progressive enhancement if JS is disabled.
      const comparisonBars=gsap.utils.toArray<HTMLElement>('.value-comparison-fill');
      if(comparisonBars.length){
        gsap.fromTo(comparisonBars,{scaleX:0},{scaleX:1,duration:1.25,stagger:.17,ease:'power3.out',
          scrollTrigger:{trigger:'.value-comparison-rows',start:'top 83%',once:true}});
      }
      gsap.fromTo('.installment',{x:desktop?22:0,y:desktop?0:12,autoAlpha:0},{x:0,y:0,autoAlpha:1,stagger:.12,duration:.60,ease:'power2.out',
        clearProps:'transform,opacity,visibility',scrollTrigger:{trigger:'.installment-list',start:'top 92%',once:true}});
      gsap.fromTo('.contact-heading,.contact-panel',{y:desktop?32:17,autoAlpha:0},{y:0,autoAlpha:1,stagger:.13,duration:desktop?.92:.67,ease:'power3.out',
        clearProps:'transform,opacity,visibility',scrollTrigger:{trigger:'#contact',start:'top 79%',once:true}});
      if(desktop){
        gsap.fromTo('#opportunity .photo-viewport img',{scale:1.08},{scale:1.0,ease:'none',
          scrollTrigger:{trigger:'#opportunity',start:'top bottom',end:'bottom top',scrub:1.15}});
        gsap.fromTo('.contact-backdrop',{scale:1.09,yPercent:-2},{scale:1.02,yPercent:3,ease:'none',
          scrollTrigger:{trigger:'#contact',start:'top bottom',end:'bottom top',scrub:1.5}});
      }
      frame=requestAnimationFrame(refresh);
    });

    window.addEventListener('load',refresh,{once:true});
    images.forEach(im=>{if(!im.complete)im.addEventListener('load',refresh,{once:true});});
    document.fonts?.ready.then(refresh).catch(()=>{});
    return ()=>{
      cancelAnimationFrame(frame);
      window.removeEventListener('load',refresh);
      images.forEach(im=>im.removeEventListener('load',refresh));
      mm.revert();
      document.querySelector('.site-nav')?.classList.remove('is-scrolled');
    };
  },[]);
  // Copy changes can change line wrapping; update trigger positions without replay.
  useEffect(()=>{
    const frame=requestAnimationFrame(()=>ScrollTrigger.refresh());
    return ()=>cancelAnimationFrame(frame);
  },[lang]);
}
