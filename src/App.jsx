import { useState } from "react"
import Intro from "./components/Intro"
import ParticlesBackground from "./components/lightswind/particles-background";
import Hero from "./components/Hero";
import {motion,AnimatePresence} from 'motion/react'
import ImageSection from "./components/ImageSection";


function App() {
const [close,setClose]=useState(false)
  return (
    <>
      <Intro close={close} setClose={setClose} />
      <AnimatePresence>
        {close && (
          <motion.div
            initial={{ opacity: 0, }}
            animate={{ opacity: 1, }}
            transition={{duration:1.2}}
            className="min-h-[2000px] relative z-10 [&>section]:z-50 [&>section]:relative"
          >
            <div
              className="fixed inset-0 -z-10 bg-center bg-cover"
              style={{ backgroundImage: `url(${import.meta.env.BASE_URL}main.webp)` }}
            />
            <ParticlesBackground
              colors={["#ffd60a"]}
              size={4}
              countDesktop={80}
              countTablet={60}
              countMobile={40}
              zIndex={1000}
              height="90%"
            />

            <div className="absolute inset-0  bg-black/40 backdrop-blur-[1.5px] w-full h-full"></div>
            <Hero />
            <ImageSection/>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default App
