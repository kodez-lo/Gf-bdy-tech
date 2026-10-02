import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { siteConfig } from '../config/siteConfig';
import SectionHeading from '../components/SectionHeading';
import { useReducedMotion } from '../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

export default function TimelineSection() {
  const root=useRef(null); const reduced=useReducedMotion();
  useLayoutEffect(()=>{if(reduced)return;const ctx=gsap.context(()=>{gsap.utils.toArray('.memory-card').forEach((el)=>gsap.fromTo(el,{opacity:0,y:55},{opacity:1,y:0,duration:.9,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 82%'}}));},root);return()=>ctx.revert()},[reduced]);
  return <section ref={root} className="section-shell bg-[#100a0e]"><div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12"><SectionHeading eyebrow="Chapter 01 · The beginning" title="The memories that quietly became important." copy="A few chapters, a few photographs, and the kind of small moments that are easy to miss until you look back."/><div className="relative mt-16 md:mt-24"><div className="absolute bottom-0 left-[14px] top-0 w-px bg-gradient-to-b from-[#d6a475]/40 via-white/10 to-transparent md:left-1/2"/>{siteConfig.memories.map((m,i)=><article key={m.title} className={`memory-card relative mb-14 grid items-center gap-7 pl-10 md:mb-24 md:grid-cols-2 md:pl-0 ${i%2?'md:[&>div:first-child]:order-2':''}`}><div className={`relative ${i%2?'md:pl-12':'md:pr-12'}`}><span className="absolute -left-[31px] top-5 h-3 w-3 rounded-full border-2 border-[#d6a475] bg-[#100a0e] md:left-auto md:right-[-7px] md:top-1/2 md:-translate-y-1/2"/><div className="overflow-hidden rounded-[28px] border border-white/10 bg-white/5 p-2"><img src={m.photo} alt={m.title} loading="lazy" className="aspect-[4/5] w-full rounded-[22px] object-cover" style={{objectPosition:siteConfig.imagePositions[m.photo]}}/></div></div><div className={`${i%2?'md:pr-12 md:text-right':'md:pl-12'}`}><p className="text-[10px] uppercase tracking-[.36em] text-[#d6a475]">{String(i+1).padStart(2,'0')} · {m.date}</p><h3 className="mt-3 font-display text-3xl text-white sm:text-4xl">{m.title}</h3><p className={`mt-4 max-w-md text-sm leading-7 text-white/55 ${i%2?'md:ml-auto':''}`}>{m.description}</p></div></article>)}</div></div></section>;
}
