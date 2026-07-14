import { motion } from "motion/react";

function Skew({ isInView }) {
  return (
    isInView && (
      <motion.div
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        initial={{ opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="absolute top-0 left-0 w-full h-full skew-2 bg-yellow-300 rounded-2xl -z-50"
      ></motion.div>
    )
  );
}

export default Skew;
