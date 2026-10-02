import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MailOpen } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

export default function EnvelopeLetter() {
  const [open, setOpen] = useState(false);
  return <div className="mx-auto max-w-5xl">
    <AnimatePresence mode="wait">
      {!open ? <motion.button key="envelope" onClick={()=>setOpen(true)} className="mx-auto block w-full max-w-xl rounded-[30px] border border-[#d6a475]/25 bg-[#24141a] p-8 text-center shadow-2xl" whileHover={{y:-4}} whileTap={{scale:.99}} initial={{opacity:0,y:25}} whileInView={{opacity:1,y:0}} viewport={{once:true}}>
        <div className="relative mx-auto mb-6 h-44 w-64 max-w-full overflow-hidden rounded-xl bg-[#d3aa83] shadow-xl"><div className="absolute inset-0 bg-[linear-gradient(145deg,transparent_49%,rgba(91,42,49,.18)_50%)]"/><div className="absolute left-1/2 top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[#6e293a] text-[#f6e8d9]"><MailOpen size={20}/></div></div>
        <p className="font-display text-3xl text-white">I wrote something for you.</p><p className="mt-2 text-sm text-white/40">Tap the envelope to open it.</p>
      </motion.button> : <motion.article key="letter" initial={{opacity:0,y:40}} animate={{opacity:1,y:0}} className="grid overflow-hidden rounded-[32px] border border-white/10 bg-[#f4eadf] text-[#2a1720] shadow-2xl lg:grid-cols-[.9fr_1.1fr]">
        <div className="relative min-h-[420px]"><img src={siteConfig.photos.letter} alt="Portrait beside birthday letter" className="absolute inset-0 h-full w-full object-cover" style={{objectPosition:siteConfig.imagePositions[siteConfig.photos.letter]}}/></div>
        <div className="max-h-[72svh] overflow-y-auto p-7 sm:p-10 lg:max-h-none lg:p-12"><p className="mb-7 text-[10px] uppercase tracking-[.4em] text-[#8b5760]">For {siteConfig.girlfriendName}</p>{siteConfig.letter.map((p,i)=><p key={i} className={`mb-5 leading-8 ${i===0?'font-display text-4xl':'text-[15px] text-[#4e3940]'}`}>{p}</p>)}<p className="mt-9 font-display text-2xl">— {siteConfig.senderName}</p><button className="mt-9 text-xs uppercase tracking-[.28em] text-[#8b5760]" onClick={()=>setOpen(false)}>Fold letter</button></div>
      </motion.article>}
    </AnimatePresence>
  </div>;
}
