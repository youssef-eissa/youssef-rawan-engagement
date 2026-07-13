import { motion,  AnimatePresence} from "motion/react";
import CountdownTimer from "./CountdownTimer";
import { LiaAngleDoubleDownSolid } from "react-icons/lia";
import { useEffect, useState } from "react";

function Hero() {
    const [visible,setVisible]=useState(true)
    useEffect(()=>{
        function handleScroll(){
            setVisible(window.scrollY < 100)
        }
        window.addEventListener("scroll",handleScroll,{passive:true})
        return ()=>{
        window.removeEventListener("scroll", handleScroll);

        }
    },[])
  return (
    <section className=" h-screen flex items-center justify-center flex-col gap-10">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1], delay: 0.4 }}
        className="flex items-center justify-center gap-10 font-black-ops text-3xl text-yellow-300 space-y-10"
      >
        The Engage of <br /> Youssef <br /> & <br /> Rawan
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1], delay: 0.8 }}
        className="flex items-center justify-center gap-10 font-playwrite text-xl text-yellow-300 space-y-10"
      >
        Join Our Day
      </motion.div>
      <AnimatePresence>
        {visible && (
          <motion.span
            // href="#img"
            // onClick={(e) => {
            //   e.preventDefault();
            //   document.getElementById("img")?.scrollIntoView({ behavior: "smooth" });
            // }}
            className="animate-bounce absolute text-yellow-300 bottom-5 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <LiaAngleDoubleDownSolid size={24} />
          </motion.span>
        )}
      </AnimatePresence>
    </section>
  );
}

export default Hero;
