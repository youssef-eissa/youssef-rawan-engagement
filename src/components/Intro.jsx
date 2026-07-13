import { motion, AnimatePresence } from "motion/react";
import { useCallback, useEffect } from "react";
import { BsFillEnvelopeOpenHeartFill } from "react-icons/bs";

function Intro({ close, setClose }) {
  const closeIntro = useCallback(() => {
    setClose(true);
  }, [setClose]);
  useEffect(()=>{
    if(!close){
        document.documentElement.style.overflow="hidden"
    } else {
        document.documentElement.style.overflow = "auto";

    }
    return()=>{
        document.documentElement.style.overflow = "auto";

    }
  },[close])
  return (
    <AnimatePresence>
      {!close && (
        <motion.div
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
          exit={{ y: "-100%", scale: 1.05 ,opacity:0}}
          className="absolute top-0 left-0 z-50 h-screen w-screen flex items-center justify-between py-10 bg-center bg-cover  bg-[url('/main.jpeg')] flex-col gap-10 overflow-hidden"
        >
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
            <BsFillEnvelopeOpenHeartFill/>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Intro;
