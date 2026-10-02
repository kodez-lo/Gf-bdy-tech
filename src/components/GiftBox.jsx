import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Sparkles } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

export default function GiftBox() {
  const [open, setOpen] = useState(false);
  return <div className="relative mx-auto grid min-h-[420px] max-w-xl place-items-center overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-[#211219] to-[#100a0e] p-6">
    <AnimatePresence mode="wait">
      {!open ? <motion.button key="gift" onClick={()=>setOpen(true)} className="group text-center" initial={{scale:.9,opacity:0}} whileInView={{scale:1,opacity:1}} whileTap={{scale:.96}} viewport={{once:true}} aria-label="Open surprise gift">
        <motion.div animate={{y:[0,-8,0],rotate:[0,-2,2,0]}} transition={{repeat:Infinity,duration:3.4,ease:'easeInOut'}} className="mx-auto grid h-36 w-36 place-items-center rounded-[32px] border border-[#d6a475]/30 bg-[#6a263a]/40 shadow-glow"><Gift size={58} strokeWidth={1.2} className="text-[#f3cfab]"/></motion.div>
        <p className="mt-6 font-display text-3xl text-white">One more thing…</p><p className="mt-2 text-sm text-white/40">Tap the gift</p>
      </motion.button> : <motion.div key="reveal" className="grid items-center gap-6 sm:grid-cols-2" initial={{opacity:0,scale:.9}} animate={{opacity:1,scale:1}}>
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl"><img src={siteConfig.photos.gift} alt="Gift memory" className="h-full w-full object-cover" style={{objectPosition:siteConfig.imagePositions[siteConfig.photos.gift]}}/><div className="absolute inset-0 ring-1 ring-inset ring-white/10"/></div>
        <div><Sparkles className="mb-4 text-[#d6a475]"/><p className="font-display text-3xl leading-tight text-white">{siteConfig.giftMessage}</p><button className="mt-6 text-xs uppercase tracking-[.3em] text-[#d6a475]" onClick={()=>setOpen(false)}>Close gift</button></div>
      </motion.div>}
    </AnimatePresence>
    {open && <div className="confetti" aria-hidden="true">{Array.from({length:16},(_,i)=><i key={i} style={{'--i':i}}/>)}</div>}
  </div>;
}
