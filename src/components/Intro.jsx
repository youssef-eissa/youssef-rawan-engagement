import { motion, AnimatePresence } from "motion/react";
import { useCallback, useEffect, useRef } from "react";
import { BsFillEnvelopeOpenHeartFill } from "react-icons/bs";

function Intro({ close, setClose, onOpen }) {
  const buttonRef=useRef(null)
  const closeIntro = useCallback(() => {
    onOpen?.();
    setClose(true);
  }, [setClose, onOpen]);
  useEffect(()=>{
    if(!close){
        document.documentElement.style.overflow="hidden"
    }
    return()=>{
        document.documentElement.style.overflow = "";

    }
  },[close])

  useEffect(() => {
    const timer=setTimeout(() => {
      if(buttonRef.current){
        buttonRef.current.click()
      }
    }, 1000);
    return ()=>clearInterval(timer)
  }, [onOpen]);

  function handleLCick(){
    onOpen?.();

  }

  useEffect(()=>{
  },[])
  return (
    <AnimatePresence
      onExitComplete={() => {
        document.documentElement.style.overflow = "";
      }}
    >
      {!close && (
        <motion.div
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
          exit={{ y: "-100%", opacity: 0 }}
          className="absolute top-0 left-0 z-50 h-dvh w-screen flex items-center justify-between py-10 bg-center bg-cover flex-col gap-10 overflow-hidden"
          style={{
            backgroundImage: `url(${import.meta.env.BASE_URL}main.jpeg)`,
          }}
        >
          <button onClick={handleLCick} ref={buttonRef} className="absolute">
            
          </button>
          <div className="absolute inset-0 h-full w-full bg-black/50 -z-10"></div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1], delay: 0.4 }}
            className="flex items-center justify-center gap-10 font-playwrite text-yellow-300 space-y-10"
          >
            The Engamement of <br /> <br /> Youssef <br /> <br /> & <br />{" "}
            <br /> Rawan
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1], delay: 0.8 }}
            className="flex items-center justify-center gap-10 font-black-ops text-3xl text-yellow-300 space-y-10"
          >
            This Escalated Quickly
          </motion.div>
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1], delay: 0.4 }}
            className="p-2 px-10 text-yellow-300 border border-yellow-300 rounded-2xl flex items-center gap-3"
            onClick={closeIntro}
          >
            Open Invitaion
            <BsFillEnvelopeOpenHeartFill />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Intro;
