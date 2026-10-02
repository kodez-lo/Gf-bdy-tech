import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { siteConfig } from '../config/siteConfig';

export default function PhotoModal({ images, index, onClose, onIndex }) {
  const touchStart = useRef(null);
  useEffect(() => {
    if (index == null) return;
    const key = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onIndex((index + 1) % images.length);
      if (e.key === 'ArrowLeft') onIndex((index - 1 + images.length) % images.length);
    };
    window.addEventListener('keydown', key);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', key); document.body.style.overflow = ''; };
  }, [index, images.length, onClose, onIndex]);
  const onTouchStart = (e) => { touchStart.current = e.touches?.[0]?.clientX ?? null; };
  const onTouchEnd = (e) => {
    if (touchStart.current == null) return;
    const end = e.changedTouches?.[0]?.clientX ?? touchStart.current;
    const delta = end - touchStart.current;
    touchStart.current = null;
    if (Math.abs(delta) < 45) return;
    onIndex(delta < 0 ? (index + 1) % images.length : (index - 1 + images.length) % images.length);
  };
  return <AnimatePresence>{index != null && <motion.div className="fixed inset-0 z-[120] grid place-items-center bg-[#090608]/95 p-4" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={onClose} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd} role="dialog" aria-modal="true" aria-label="Photo viewer">
    <motion.img key={images[index]} src={images[index]} alt={`Memory ${index+1}`} className="max-h-[88svh] max-w-[92vw] rounded-2xl object-contain shadow-2xl" initial={{opacity:0,scale:.95}} animate={{opacity:1,scale:1}} exit={{opacity:0,scale:.97}} onClick={(e)=>e.stopPropagation()} style={{objectPosition:siteConfig.imagePositions[images[index]]}} />
    <button onClick={onClose} className="icon-button absolute right-5 top-5" aria-label="Close gallery"><X/></button>
    <button onClick={(e)=>{e.stopPropagation();onIndex((index-1+images.length)%images.length)}} className="icon-button absolute left-3 top-1/2 -translate-y-1/2 sm:left-6" aria-label="Previous photo"><ChevronLeft/></button>
    <button onClick={(e)=>{e.stopPropagation();onIndex((index+1)%images.length)}} className="icon-button absolute right-3 top-1/2 -translate-y-1/2 sm:right-6" aria-label="Next photo"><ChevronRight/></button>
    <div className="absolute bottom-5 rounded-full border border-white/10 bg-black/40 px-4 py-2 text-xs text-white/60">{index+1} / {images.length}</div>
  </motion.div>}</AnimatePresence>;
}
