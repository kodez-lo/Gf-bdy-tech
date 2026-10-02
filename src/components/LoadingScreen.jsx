import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig } from '../config/siteConfig';

export default function LoadingScreen({ onDone }) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const urls = [...new Set(Object.values(siteConfig.photos).flat().filter((v) => typeof v === 'string'))];
    let completed = 0;
    let cancelled = false;
    const finishOne = () => {
      completed += 1;
      const next = Math.round((completed / Math.max(1, urls.length)) * 100);
      if (!cancelled) setProgress(next);
      if (completed >= urls.length) {
        setTimeout(() => {
          if (!cancelled) {
            setVisible(false);
            setTimeout(onDone, 520);
          }
        }, 180);
      }
    };
    urls.forEach((src) => {
      const img = new Image();
      img.onload = finishOne;
      img.onerror = finishOne;
      img.src = src;
    });
    if (!urls.length) finishOne();
    return () => { cancelled = true; };
  }, [onDone]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div className="fixed inset-0 z-[100] grid place-items-center bg-[#100a0e]" exit={{ opacity: 0 }} transition={{ duration: .5 }}>
          <div className="relative w-[min(82vw,420px)] text-center">
            <div className="mx-auto mb-9 grid h-16 w-16 place-items-center rounded-full border border-[#d6a475]/35 bg-white/[.03] text-2xl font-display text-[#f7efe8] shadow-glow">K</div>
            <p className="mb-5 text-[10px] uppercase tracking-[.45em] text-[#d6a475]/70">Preparing something special</p>
            <div className="h-px overflow-hidden bg-white/10"><motion.div className="h-full bg-[#d6a475]" animate={{ width: `${progress}%` }} transition={{ ease: 'easeOut' }} /></div>
            <div className="mt-3 flex justify-between text-xs text-white/40"><span>Loading memories</span><span>{progress}%</span></div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
