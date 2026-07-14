import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from "react";
import { FaMusic } from "react-icons/fa6";
import {motion,AnimatePresence} from 'motion/react'
import { Slider } from "@/components/ui/slider";
import ReactAudioPlayer from "react-audio-player";

const MusicPlayer = forwardRef(function MusicPlayer({ src }, ref) {
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const audioRef = useRef(null);
  const [extend, setExtend] = useState(false)
  const [sliderVisible, setSliderVisible] = useState(false)
const containerRef=useRef(null)
  useImperativeHandle(ref, () => ({
    play: () => {
      setIsMuted(false);
      audioRef.current.muted = false;
      audioRef.current.play().catch(() => {});
    },
  }));

useEffect(()=>{
  function handleClose(e){
    if(containerRef.current && !containerRef.current.contains(e.target)){
      setExtend(false)
    }
  }
  document.addEventListener('click',handleClose)

  return ()=>document.removeEventListener('click',handleClose)
},[])
  useEffect(() => {
    audioRef.current.play().catch(() => {});
  }, []);

  useEffect(() => {
    // أول لمسة/كليك/زرار في أي مكان في الصفحة بتفك الميوت وتشغّل الصوت فعليًا
    const unmuteOnFirstInteraction = () => {
      setIsMuted(false);
      audioRef.current.muted = false;
      audioRef.current.play().catch(() => {});
    };
    document.addEventListener("pointerdown", unmuteOnFirstInteraction, { once: true });
    document.addEventListener("keydown", unmuteOnFirstInteraction, { once: true });
    return () => {
      document.removeEventListener("pointerdown", unmuteOnFirstInteraction);
      document.removeEventListener("keydown", unmuteOnFirstInteraction);
    };
  }, []);

  useEffect(() => {
    audioRef.current.volume = volume;
  }, [volume]);

  const toggleMute = () => {
    // setExtend(p=>!p)
    const next = !isMuted;
    setIsMuted(next);
    audioRef.current.muted = next;
    // أول تفاعل من اليوزر بيسمح بتشغيل الصوت فعليًا
    if (!next) audioRef.current.play().catch(() => {});
  };

  

  const applyVolume = (next) => {
    setVolume(next);
    if (next > 0 && isMuted) {
      setIsMuted(false);
      audioRef.current.muted = false;
      audioRef.current.play().catch(() => {});
    }
  };

  return (
    <>
      <audio

        ref={audioRef}
        src={src}
        loop
        autoPlay
        muted={isMuted}
      />
      <motion.div
        ref={containerRef}
        onClick={() => setExtend((p) => !p)}
        role="button"
        animate={{ height: extend ? 200 : 52 }}
        transition={{ duration: 0.5 }}
        onAnimationComplete={() => setSliderVisible(extend)}
        className="fixed bottom-5 inset-e-5  z-50  justify-end  rounded-full px-2 py-4 shadow-lg bg-white/10 backdrop-blur-xs w-13 min-h-13 flex flex-col gap-2 items-center"
      >
        {/* <button
          onClick={() => changeVolume(-0.1)}
          className="w-8 h-8 flex items-center justify-center text-white"
          title="صوت أقل"
        >
          −
        </button> */}
        <AnimatePresence>
          {sliderVisible && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              onPointerDown={(e) => e.stopPropagation()}
              className="flex flex-1"
            >
              <Slider
                value={[volume * 100]}
                onValueChange={(v) => applyVolume(v / 100)}
                max={100}
                step={1}
                orientation="vertical"
                className="flex-1"
              />
            </motion.div>
          )}
        </AnimatePresence>

        <button
          // onClick={toggleMute}
          className="w-9 h-9 rounded-full flex items-center justify-center text-yellow-300"
        >
          <FaMusic />
        </button>
        {/* <button
          onClick={() => changeVolume(0.1)}
          className="w-8 h-8 flex items-center justify-center text-white"
          title="صوت أعلى"
        >
          +
        </button> */}
      </motion.div>
    </>
  );
});

export default MusicPlayer;
