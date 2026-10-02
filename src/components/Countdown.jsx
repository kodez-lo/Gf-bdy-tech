import { useEffect, useState } from 'react';
import { getCountdown } from '../utils/time';
import { siteConfig } from '../config/siteConfig';

export default function Countdown() {
  const [time, setTime] = useState(() => getCountdown(siteConfig.birthdayDate));
  useEffect(() => {
    const id = setInterval(() => setTime(getCountdown(siteConfig.birthdayDate)), 1000);
    return () => clearInterval(id);
  }, []);
  if (!time.diff) return <div className="rounded-full border border-[#d6a475]/30 bg-[#d6a475]/10 px-5 py-2 text-xs uppercase tracking-[.28em] text-[#f3cfab]">It&apos;s finally your day.</div>;
  return (
    <div className="inline-grid grid-cols-4 overflow-hidden rounded-2xl border border-white/10 bg-black/20">
      {[['Days',time.days],['Hours',time.hours],['Min',time.minutes],['Sec',time.seconds]].map(([label,val])=><div key={label} className="min-w-[66px] border-r border-white/10 px-3 py-3 text-center last:border-r-0"><div className="font-display text-xl text-white sm:text-2xl">{String(val).padStart(2,'0')}</div><div className="mt-1 text-[8px] uppercase tracking-[.24em] text-white/35">{label}</div></div>)}
    </div>
  );
}
