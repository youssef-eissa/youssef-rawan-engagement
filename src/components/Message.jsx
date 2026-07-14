import { motion, AnimatePresence, useInView } from "motion/react";
import { useRef } from "react";
import Skew from "./Skew";
import { GiDoorRingHandle } from "react-icons/gi";
import { GiClothes } from "react-icons/gi";

function Message() {
  const ref = useRef(null);

  const isInView = useInView(ref);

  return (
    <section
      ref={ref}
      className="relative font-playwrite text-yellow-300 w-[90%]  z- mx-auto  h-50"
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
            Dress Code
            <div className="flex  gap-4">
              <span className="text-xl font-black-ops flex items-center gap-3">
                <GiClothes size={28} />
              </span>
              <span className="w-10 aspect-square bg-white rounded-full"></span>
              <span className="w-10 aspect-square bg-white rounded-full"></span>
              <span className="w-10 aspect-square bg-white rounded-full"></span>
            </div>
            <GiDoorRingHandle size={32} className="absolute top-5 right-5" />
            <GiDoorRingHandle size={32} className="absolute bottom-5 left-5" />
          </motion.div>
        )}
      </AnimatePresence>
      <Skew isInView={isInView} />
    </section>
  );
}

export default Message;
