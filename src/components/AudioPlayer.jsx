import { useEffect, useRef, useState } from 'react';
import { Pause, Play, Volume2, VolumeX } from 'lucide-react';
import { formatTime } from '../utils/time';

export default function AudioPlayer({ src, title, artist, cover, waveform = false }) {
  const ref=useRef(null); const [playing,setPlaying]=useState(false); const [time,setTime]=useState(0); const [duration,setDuration]=useState(0); const [muted,setMuted]=useState(false);
  useEffect(()=>{const a=ref.current;if(!a)return;const update=()=>setTime(a.currentTime);const meta=()=>setDuration(a.duration||0);const end=()=>setPlaying(false);a.addEventListener('timeupdate',update);a.addEventListener('loadedmetadata',meta);a.addEventListener('ended',end);return()=>{a.removeEventListener('timeupdate',update);a.removeEventListener('loadedmetadata',meta);a.removeEventListener('ended',end)}},[]);
  if(!src) return null;
  const toggle=()=>{const a=ref.current;if(a.paused){a.play();setPlaying(true)}else{a.pause();setPlaying(false)}};
  return <div className="overflow-hidden rounded-[28px] border border-white/10 bg-white/[.035] p-4 sm:p-5"><audio ref={ref} src={src} preload="metadata" />
    <div className="flex items-center gap-4"><img src={cover} alt="Audio cover" className="h-20 w-20 rounded-2xl object-cover"/><div className="min-w-0 flex-1"><p className="truncate font-display text-xl text-white">{title}</p>{artist&&<p className="mt-1 truncate text-xs text-white/40">{artist}</p>}{waveform&&<div className="waveform mt-3" aria-hidden="true">{Array.from({length:28},(_,i)=><i key={i} style={{height:`${25+((i*19)%70)}%`}}/>)}</div>}</div></div>
    <div className="mt-4 flex items-center gap-3"><button onClick={toggle} className="icon-button" aria-label={playing?'Pause':'Play'}>{playing?<Pause size={18}/>:<Play size={18}/>}</button><span className="w-10 text-right text-[10px] text-white/35">{formatTime(time)}</span><input aria-label="Audio progress" type="range" min="0" max={duration||0} step=".1" value={Math.min(time,duration||0)} onChange={e=>{ref.current.currentTime=Number(e.target.value);setTime(Number(e.target.value))}} className="audio-range flex-1"/><span className="w-10 text-[10px] text-white/35">{formatTime(duration)}</span><button onClick={()=>{const a=ref.current;a.muted=!a.muted;setMuted(a.muted)}} className="text-white/55" aria-label={muted?'Unmute':'Mute'}>{muted?<VolumeX size={18}/>:<Volume2 size={18}/>}</button></div>
  </div>;
}
