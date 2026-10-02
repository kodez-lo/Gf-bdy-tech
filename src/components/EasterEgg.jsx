import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Star, X } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

export default function EasterEgg() {
  const [taps,setTaps]=useState(0); const [open,setOpen]=useState(false);
  const tap=()=>{const n=taps+1;setTaps(n);if(n>=5){setOpen(true);setTaps(0)}};
  return <><button onClick={tap} className="fixed bottom-4 right-4 z-40 grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-black/25 text-[#d6a475]/45 transition hover:text-[#d6a475]" aria-label="Tiny star"><Star size={14}/></button><AnimatePresence>{open&&<motion.div className="fixed inset-0 z-[130] grid place-items-center bg-black/80 p-5" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}><motion.div initial={{scale:.9,y:20}} animate={{scale:1,y:0}} className="relative max-w-md overflow-hidden rounded-[28px] border border-[#d6a475]/25 bg-[#1d1016] p-5 shadow-2xl"><button onClick={()=>setOpen(false)} className="icon-button absolute right-4 top-4 z-10" aria-label="Close secret"><X size={18}/></button><img src={siteConfig.photos.gift} alt="Secret memory" className="aspect-[4/3] w-full rounded-2xl object-cover" style={{objectPosition:siteConfig.imagePositions[siteConfig.photos.gift]}}/><p className="mt-5 font-display text-3xl text-white">You found the secret message ✨</p><p className="mt-3 text-sm leading-6 text-white/55">Some of the nicest things are the ones you discover by accident. Keep this one.</p></motion.div></motion.div>}</AnimatePresence></>;
}
