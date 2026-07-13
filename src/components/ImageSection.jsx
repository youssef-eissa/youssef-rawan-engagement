import { useInView } from "framer-motion";
import { useRef } from "react";
import {motion,AnimatePresence} from 'motion/react'

function ImageSection() {
    const ref = useRef(null);
    const isInView = useInView(ref);
  return (
    <section className="h-screen flex items-center justify-center" id="img">
      <div ref={ref} className="w-100 aspect-square rounded-2xl  relative ">
        <AnimatePresence>
          {isInView && (
            <>
              <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1}}
                initial={{ y: -10, opacity: 0 }}
                transition={{duration:0.5,delay:0.2}}
                className="w-full h-fill rounded-2xl overflow-hidden"
              >
                <img src="/main.jpeg" alt="img" className="w-full h-full" />
              </motion.div>
              <span className="absolute -top-55 left-1/2 -translate-x-1/2 h-50 w-1 bg-yellow-300 z-50"></span>
            </>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

export default ImageSection