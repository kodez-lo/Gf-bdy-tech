import { useEffect, useRef, useState } from 'react';
import { siteConfig } from '../config/siteConfig';

export default function ScratchCard() {
  const canvasRef = useRef(null);
  const [revealed, setRevealed] = useState(false);
  const drawing = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr; canvas.height = rect.height * dpr;
      ctx.setTransform(dpr,0,0,dpr,0,0);
      const g=ctx.createLinearGradient(0,0,rect.width,rect.height);
      g.addColorStop(0,'#b98a67'); g.addColorStop(.5,'#e0b991'); g.addColorStop(1,'#8a5e4e');
      ctx.globalCompositeOperation='source-over'; ctx.fillStyle=g; ctx.fillRect(0,0,rect.width,rect.height);
      ctx.fillStyle='rgba(255,255,255,.75)'; ctx.font='600 12px system-ui'; ctx.textAlign='center'; ctx.fillText('SCRATCH TO REVEAL',rect.width/2,rect.height/2);
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  const scratch = (e) => {
    if (!drawing.current || revealed) return;
    const canvas = canvasRef.current; const rect=canvas.getBoundingClientRect(); const ctx=canvas.getContext('2d',{willReadFrequently:true});
    const point=e.touches?.[0]||e; const x=point.clientX-rect.left; const y=point.clientY-rect.top;
    ctx.globalCompositeOperation='destination-out'; ctx.beginPath(); ctx.arc(x,y,28,0,Math.PI*2); ctx.fill();
    const data=ctx.getImageData(0,0,canvas.width,canvas.height).data; let transparent=0;
    for(let i=3;i<data.length;i+=80){ if(data[i]===0) transparent++; }
    if(transparent/(data.length/80)>.42){ setRevealed(true); ctx.clearRect(0,0,canvas.width,canvas.height); }
  };

  return <div className="relative mx-auto aspect-[4/3] w-full max-w-lg overflow-hidden rounded-[28px] border border-white/10 bg-[#1a0f15] shadow-2xl">
    <img src={siteConfig.photos.scratch} alt="Hidden birthday memory" className="absolute inset-0 h-full w-full object-cover" style={{objectPosition:siteConfig.imagePositions[siteConfig.photos.scratch]}} />
    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent p-6 pt-20"><p className="font-display text-2xl text-white">{siteConfig.scratchMessage}</p></div>
    <canvas ref={canvasRef} className={`absolute inset-0 h-full w-full touch-none transition-opacity duration-500 ${revealed?'pointer-events-none opacity-0':'opacity-100'}`} onPointerDown={(e)=>{drawing.current=true;scratch(e)}} onPointerMove={scratch} onPointerUp={()=>drawing.current=false} onPointerCancel={()=>drawing.current=false} />
  </div>;
}
