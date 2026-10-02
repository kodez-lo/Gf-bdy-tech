import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Delete, LockKeyhole, Sparkles } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

const keys = ['1','2','3','4','5','6','7','8','9','clear','0','delete'];

export default function LockScreen({ onUnlock }) {
  const [pin, setPin] = useState('');
  const [wrong, setWrong] = useState(false);
  const [success, setSuccess] = useState(false);

  const press = (key) => {
    if (success) return;
    if (key === 'clear') return setPin('');
    if (key === 'delete') return setPin((p) => p.slice(0, -1));
    if (pin.length >= 4) return;
    const next = pin + key;
    setPin(next);
    if (next.length === 4) {
      setTimeout(() => {
        if (next === siteConfig.pin) {
          setSuccess(true);
          if (navigator.vibrate) navigator.vibrate([20, 40, 20]);
          setTimeout(onUnlock, 850);
        } else {
          setWrong(true);
          if (navigator.vibrate) navigator.vibrate(50);
          setTimeout(() => { setWrong(false); setPin(''); }, 480);
        }
      }, 130);
    }
  };

  return (
    <motion.section className="fixed inset-0 z-[90] overflow-hidden bg-[#100a0e]" exit={{ opacity: 0, scale: 1.02 }}>
      <div className="grid min-h-[100svh] md:grid-cols-[1.1fr_.9fr]">
        <div className="relative min-h-[42svh] md:min-h-[100svh]">
          <img src={siteConfig.photos.lockScreen} alt="Birthday portrait" className="absolute inset-0 h-full w-full object-cover" style={{ objectPosition: siteConfig.imagePositions[siteConfig.photos.lockScreen] }} fetchPriority="high" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#100a0e] via-transparent to-black/5 md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-[#100a0e]" />
          <div className="absolute bottom-8 left-6 max-w-xs md:bottom-14 md:left-12">
            <span className="mb-3 inline-flex items-center gap-2 text-[10px] uppercase tracking-[.38em] text-[#f3cfab]"><Sparkles size={13}/> Private surprise</span>
            <h1 className="font-display text-3xl leading-tight text-white md:text-5xl">A little surprise is waiting for you.</h1>
          </div>
        </div>
        <div className="relative flex items-center justify-center px-6 pb-8 pt-3 md:p-10">
          <AnimatePresence>{success && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 z-20 grid place-items-center bg-[#100a0e]/90"><div className="text-center"><Sparkles className="mx-auto mb-4 text-[#d6a475]"/><p className="font-display text-3xl text-white">Unlocked</p></div></motion.div>}</AnimatePresence>
          <motion.div animate={wrong ? { x: [0,-12,12,-8,8,0] } : { x: 0 }} className="w-full max-w-sm">
            <div className="mb-7 text-center"><LockKeyhole className="mx-auto mb-4 text-[#d6a475]" size={22}/><p className="font-display text-2xl text-[#f7efe8]">Enter the secret code</p><p className="mt-2 text-sm text-white/40">Four digits. You know the one.</p></div>
            <div className="mb-7 flex justify-center gap-3" aria-label={`${pin.length} of 4 digits entered`}>{Array.from({length:4}).map((_,i)=><span key={i} className={`h-2.5 w-2.5 rounded-full border border-[#d6a475]/50 transition ${i < pin.length ? 'scale-110 bg-[#d6a475]' : 'bg-transparent'}`}/>)}</div>
            <div className="grid grid-cols-3 gap-3">
              {keys.map((key) => key === 'clear' ? <button key={key} onClick={()=>press(key)} className="keypad text-xs uppercase tracking-widest text-white/45">Clear</button> : key === 'delete' ? <button key={key} aria-label="Delete digit" onClick={()=>press(key)} className="keypad"><Delete size={19}/></button> : <button key={key} onClick={()=>press(key)} className="keypad text-lg">{key}</button>)}
            </div>
            {wrong && <p className="mt-5 text-center text-xs uppercase tracking-[.25em] text-[#e798a7]">Not quite — try again</p>}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
