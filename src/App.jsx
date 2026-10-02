import { lazy, Suspense, useCallback, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import LoadingScreen from './components/LoadingScreen';
import LockScreen from './components/LockScreen';
import EasterEgg from './components/EasterEgg';
import CinematicIntro from './sections/CinematicIntro';
import HeroSection from './sections/HeroSection';
import TimelineSection from './sections/TimelineSection';
import GallerySection from './sections/GallerySection';
import PolaroidSection from './sections/PolaroidSection';
import AppreciationSection from './sections/AppreciationSection';
import QuizSection from './sections/QuizSection';
import SurpriseSection from './sections/SurpriseSection';
import LetterSection from './sections/LetterSection';
import MusicSection from './sections/MusicSection';
import CollageSection from './sections/CollageSection';
import FinaleSection from './sections/FinaleSection';
const CakeSection=lazy(()=>import('./sections/CakeSection'));

export default function App(){
  const [loaded,setLoaded]=useState(false);
  const [unlocked,setUnlocked]=useState(()=>sessionStorage.getItem('birthday-unlocked')==='yes');
  const [intro,setIntro]=useState(false);
  const finishLoad=useCallback(()=>setLoaded(true),[]);
  const unlock=()=>{sessionStorage.setItem('birthday-unlocked','yes');setUnlocked(true)};
  const begin=()=>{setIntro(true);setTimeout(()=>document.getElementById('story')?.scrollIntoView({behavior:'smooth'}),80)};
  return <div className="min-h-screen bg-[#100a0e] text-white">
    {!loaded&&<LoadingScreen onDone={finishLoad}/>} 
    <AnimatePresence>{loaded&&!unlocked&&<LockScreen key="lock" onUnlock={unlock}/>}</AnimatePresence>
    {loaded&&unlocked&&!intro&&<CinematicIntro onBegin={begin}/>} 
    {loaded&&unlocked&&intro&&<motion.main initial={{opacity:0}} animate={{opacity:1}} transition={{duration:.7}}>
      <HeroSection/>
      <TimelineSection/>
      <div id="gallery"><GallerySection/></div>
      <PolaroidSection/>
      <AppreciationSection/>
      <QuizSection/>
      <SurpriseSection/>
      <LetterSection/>
      <MusicSection/>
      <Suspense fallback={<div className="grid min-h-[60svh] place-items-center bg-[#100a0e] text-sm text-white/35">Preparing the cake…</div>}><CakeSection/></Suspense>
      <CollageSection/>
      <FinaleSection/>
      <EasterEgg/>
    </motion.main>}
  </div>;
}
