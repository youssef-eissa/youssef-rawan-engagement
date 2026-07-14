import { useState, useRef, useEffect } from "react"
import Intro from "./components/Intro"
import ParticlesBackground from "./components/lightswind/particles-background";
import Hero from "./components/Hero";
import {motion,AnimatePresence} from 'motion/react'
import ImageSection from "./components/ImageSection";
import MusicPlayer from "./components/Audio";
import Location from "./components/Location";
import DressCode from "./components/DressCode";
import Message from "./components/Message";


function App() {
const [close,setClose]=useState(false)
const musicRef = useRef(null)
useEffect(()=>{
  const interval=setTimeout(() => {
  musicRef.current?.play();
  console.log('play')
    
  }, 2000);

return ()=>clearInterval(interval)
},[])
  return (
    <>
      <Intro
        close={close}
        setClose={setClose}
        onOpen={() => musicRef.current?.play()}
      />
      <AnimatePresence>
        {close && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
            className=" relative z-10 [&>section]:z-50 [&>section]:relative overflow-hidden space-y-40 pb-10"
          >
            <div
              className="fixed top-0 left-0 w-full h-dvh -z-10 bg-center bg-cover"
              style={{
                backgroundImage: `url(${import.meta.env.BASE_URL}main.webp)`,
              }}
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
            <ImageSection />
            <Location />
            <DressCode />
            {/* <Message/> */}
          </motion.div>
        )}
      </AnimatePresence>
      <MusicPlayer ref={musicRef} src={`${import.meta.env.BASE_URL}main.mp3`} />
    </>
  );
}

export default App
