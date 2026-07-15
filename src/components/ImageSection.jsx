import { useInView } from "framer-motion";
import { useRef } from "react";
import {motion,AnimatePresence} from 'motion/react'
import Skew from "./Skew";

function ImageSection() {
    const ref = useRef(null);
    const isInView = useInView(ref);
  return (
    <section className="h-dv flex items-center justify-center" id="img">
      <div ref={ref} className="w-[90%]  sm:w-125 aspect-square rounded-2xl  relative ">
        <Skew isInView={isInView} />

        <AnimatePresence>
          {isInView && (
            <>
              <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="w-full h-full rounded-2xl overflow-hidden relative"
              >
                <img
                  src={`${import.meta.env.BASE_URL}main.jpeg`}
                  alt="img"
                  className="w-full h-full"
                />
              </motion.div>
              {/* <span className="absolute -top-28 left-1/2 -translate-x-1/2 h-25 rounded-2xl w-1 bg-yellow-200 z-50"></span> */}
            </>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

export default ImageSection