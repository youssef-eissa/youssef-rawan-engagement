import { motion, AnimatePresence, useInView } from "motion/react";
import { useRef } from "react";
import Skew from "./Skew";
import { GiDoorRingHandle } from "react-icons/gi";
import { CiLocationOn } from "react-icons/ci";

function Location() {
        const ref = useRef(null);
    
    const isInView = useInView(ref);

  return (
    <section
      ref={ref}
      className="relative font-playwrite text-yellow-300 w-[90%]  z- mx-auto  h-52"
    >
      <AnimatePresence>
        {isInView && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex relative z-50 bg-black rounded-2xl p-3 flex-col items-center justify-center gap-4 text-xl flex-1 h-full"
          >
            Location
            <div className="flex flex-col gap-2">
              <a
                className="text-lg font-black-ops flex items-center gap-3"
                target="_blank"
                href="https://maps.app.goo.gl/LEmuSZrgujE54rBZ8?g_st=iw"
              >
                <CiLocationOn size={28} /> GATZ EGYPT
              </a>
              <span className="text-lg font-black-ops flex items-center gap-3">
                <CiLocationOn size={28} /> 9 pm - 12 am
              </span>
            </div>
            <a
              className="text-sm border border-yellow-300 rounded-2xl p-2 font-black-ops flex items-center gap-3"
              target="_blank"
              href="https://maps.app.goo.gl/LEmuSZrgujE54rBZ8?g_st=iw"
            >
              View Map location
            </a>
            <GiDoorRingHandle size={32} className="absolute top-5 right-5" />
            <GiDoorRingHandle size={32} className="absolute bottom-5 left-5" />
          </motion.div>
        )}
      </AnimatePresence>
      <Skew isInView={isInView} />
    </section>
  );
}

export default Location;
