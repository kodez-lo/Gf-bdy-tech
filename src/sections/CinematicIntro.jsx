import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import Particles from '../components/Particles';

export default function CinematicIntro({ onBegin }) {
  const [step,setStep]=useState(0);
  const lines=[...siteConfig.introLines,'Happy Birthday',siteConfig.girlfriendName];
  useEffect(()=>{if(step>=lines.length-1)return;const id=setTimeout(()=>setStep(s=>s+1),1650);return()=>clearTimeout(id)},[step,lines.length]);
  return <section className="relative min-h-[100svh] overflow-hidden bg-[#100a0e]">
    <img src={siteConfig.photos.intro} alt="Cinematic birthday portrait" className="absolute inset-0 h-full w-full object-cover" style={{objectPosition:siteConfig.imagePositions[siteConfig.photos.intro]}}/><div className="absolute inset-0 bg-gradient-to-t from-[#100a0e] via-[#100a0e]/25 to-black/20"/><Particles count={22}/>
    <div className="relative z-10 flex min-h-[100svh] flex-col items-center justify-center px-6 text-center"><AnimatePresence mode="wait"><motion.div key={step} initial={{opacity:0,y:20,filter:'blur(7px)'}} animate={{opacity:1,y:0,filter:'blur(0px)'}} exit={{opacity:0,y:-12}} transition={{duration:.8}} className={`font-display text-white ${step>=2?'text-5xl sm:text-7xl':'max-w-2xl text-3xl sm:text-5xl'}`}>{lines[step]}</motion.div></AnimatePresence>{step===lines.length-1&&<motion.button initial={{opacity:0,y:15}} animate={{opacity:1,y:0}} transition={{delay:.7}} onClick={onBegin} className="premium-button mt-10">Begin the Story <ArrowDown size={16}/></motion.button>}</div>
  </section>;
}
