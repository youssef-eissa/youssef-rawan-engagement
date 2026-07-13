import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * CountdownTimer
 * Animated countdown (months / days / hours / minutes / seconds) built with
 * React + Framer Motion. Drop in a target date and go.
 *
 * Usage:
 *   <CountdownTimer targetDate="2026-12-25T00:00:00" label="Until the big day" />
 */

function getTimeParts(targetDate) {
  const total = Math.max(0, new Date(targetDate).getTime() - Date.now());

  const totalSeconds = Math.floor(total / 1000);
  const totalDays = Math.floor(totalSeconds / 86400);

  // Approximate months as 30.44 days for a smooth "months" bucket
  const months = Math.floor(totalDays / 30.44);
  const days = Math.floor(totalDays - months * 30.44);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { total, months, days, hours, minutes, seconds };
}

function FlipDigit({ value, accent }) {
  return (
    <div
      className="relative mx-[2px] h-[1.3em] w-[0.82em] overflow-hidden rounded-md border border-white/15 bg-white/10 shadow-[0_3px_8px_rgba(0,0,0,0.35)] backdrop-blur-md"
      style={{ perspective: 300 }}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={value}
          initial={{ rotateX: 90, opacity: 0.3 }}
          animate={{ rotateX: 0, opacity: 1 }}
          exit={{ rotateX: -90, opacity: 0.3 }}
          transition={{ duration: 0.5, ease: [0.45, 0, 0.2, 1] }}
          className="absolute inset-0 flex items-center justify-center font-bold tabular-nums text-white"
          style={{ transformOrigin: "center", backfaceVisibility: "hidden" }}
        >
          {value}
        </motion.div>
      </AnimatePresence>

      {/* center hinge seam */}
      <div className="pointer-events-none absolute inset-x-0 top-1/2 z-20 h-px -translate-y-1/2 bg-white/20" />
      {/* glass sheen / depth */}
      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background: `linear-gradient(180deg, rgba(255,255,255,0.18), ${accent}22 35%, transparent 65%, rgba(0,0,0,0.25) 100%)`,
        }}
      />
    </div>
  );
}

function TimeCard({ value, label, delay, color }) {
  const padded = String(value).padStart(2, "0");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.05 }}
      className="flex flex-col items-center gap-3"
    >
      <div
        className="flex text-3xl sm:text-4xl md:text-5xl"
        style={{ perspective: 400 }}
      >
        {padded.split("").map((d, i) => (
          <FlipDigit key={i} value={d} accent={color} />
        ))}
      </div>
      <span className="text-xs font-medium uppercase tracking-[0.2em] text-white/60 sm:text-sm">
        {label}
      </span>
    </motion.div>
  );
}

export default function CountdownTimer({
  targetDate = (() => {
    const d = new Date();
    d.setMonth(d.getMonth() + 3);
    return d.toISOString();
  })(),
  label = "Counting down",
  onComplete,
}) {
  const [time, setTime] = useState(() => getTimeParts(targetDate));
  const firedRef = useRef(false);

  useEffect(() => {
    firedRef.current = false;
    const interval = setInterval(() => {
      const next = getTimeParts(targetDate);
      setTime(next);
      if (next.total <= 0 && !firedRef.current) {
        firedRef.current = true;
        onComplete?.();
        clearInterval(interval);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate, onComplete]);

  const isDone = time.total <= 0;

  const palette = ["#ff6b35", "#ffd60a", "#f72585"];
  const units = [
    { value: time.months, label: "Months" },
    { value: time.days, label: "Days" },
    { value: time.hours, label: "Hours" },
    { value: time.minutes, label: "Minutes" },
    { value: time.seconds, label: "Seconds" },
  ].map((u, i) => ({ ...u, color: palette[i % palette.length] }));

  return (
    <div className="flex w-full items-center justify-center p-6 sm:p-10">
      <div className="flex w-full max-w-3xl flex-col items-center gap-8">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center text-lg font-semibold tracking-wide  sm:text-2xl text-yellow-300!"
        >
          {isDone ? "🎉 It's here!" : label}
        </motion.h1>

        <AnimatePresence>
          {!isDone && (
            <motion.div
              key="grid"
              exit={{ opacity: 0, scale: 0.9 }}
              className="grid w-full grid-cols-3 gap-3 sm:grid-cols-5 sm:gap-4"
            >
              {units.map((u, i) => (
                <TimeCard
                  key={u.label}
                  value={u.value}
                  label={u.label}
                  delay={i * 0.08}
                  color={u.color}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {isDone && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 12 }}
            className="rounded-2xl border border-white/10 bg-white/5 px-8 py-6 text-center backdrop-blur-md"
          >
            <p className="text-3xl">🎊</p>
            <p className="mt-2 text-white/80">The wait is over.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
