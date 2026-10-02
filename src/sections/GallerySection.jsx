import { useState } from 'react';
import { motion } from 'framer-motion';
import { Expand } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import SectionHeading from '../components/SectionHeading';
import PhotoModal from '../components/PhotoModal';

export default function GallerySection() {
  const [index,setIndex]=useState(null); const imgs=siteConfig.photos.gallery;
  return <section className="section-shell bg-[#130b10]"><div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12"><SectionHeading eyebrow="Chapter 02 · Little moments" title="A gallery that feels more like a memory wall." copy="Tap any photograph to open it full-screen. Every image stays sharp — no blurred photo backgrounds, no heavy overlays."/><div className="mt-12 columns-2 gap-3 sm:columns-3 sm:gap-4 lg:columns-4">{imgs.map((src,i)=><motion.button key={src} onClick={()=>setIndex(i)} className="group relative mb-3 block w-full break-inside-avoid overflow-hidden rounded-2xl border border-white/10 bg-white/[.025] sm:mb-4" initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:'-8%'}} transition={{delay:(i%4)*.05}} whileHover={{y:-4,rotate:i%2?.6:-.6}}><img src={src} alt={`Gallery memory ${i+1}`} loading="lazy" className={`w-full object-cover transition duration-700 group-hover:scale-[1.025] ${i%3===0?'aspect-[3/4]':i%3===1?'aspect-[4/5]':'aspect-[2/3]'}`} style={{objectPosition:siteConfig.imagePositions[src]}}/><span className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-black/25 text-white/75 opacity-0 transition group-hover:opacity-100"><Expand size={15}/></span></motion.button>)}</div></div><PhotoModal images={imgs} index={index} onClose={()=>setIndex(null)} onIndex={setIndex}/></section>;
}
