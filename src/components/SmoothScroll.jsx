import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";

export default function SmoothScroll({ children }) {
  const contentRef = useRef(null);
  const [contentHeight, setContentHeight] = useState(0);

  // Calculate height on mount and resize
  useEffect(() => {
    const handleResize = () => {
      if (contentRef.current) {
        setContentHeight(contentRef.current.scrollHeight);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { mass: 0.1 });

  // Transform scroll progress to vertical translation
  const y = useTransform(smoothProgress, (value) => {
    return value * -(contentHeight - window.innerHeight);
  });

  return (
    <>
      {/* Invisible spacer to trigger native scroll */}
      <div style={{ height: contentHeight }} />

      {/* Fixed container driven by Framer Motion */}
      <motion.div
        ref={contentRef}
        style={{
          position: "fixed",
          top: 0,
          y: y,
          width: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {children}
      </motion.div>
    </>
  );
}
