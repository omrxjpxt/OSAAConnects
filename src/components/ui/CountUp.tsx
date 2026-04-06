"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface CountUpProps {
  to: number;
  suffix?: string;
  duration?: number;
  className?: string;
}

export default function CountUp({
  to,
  suffix = "",
  duration = 2,
  className = "",
}: CountUpProps) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
  const count = useMotionValue(0);
  const displayRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(count, to, {
      duration,
      ease: "easeOut",
      onUpdate: (latest) => {
        if (displayRef.current) {
          displayRef.current.textContent =
            Math.round(latest).toLocaleString() + suffix;
        }
      },
    });
    return controls.stop;
  }, [inView, to, suffix, duration, count]);

  return (
    <span ref={ref} className={className}>
      <span ref={displayRef}>0{suffix}</span>
    </span>
  );
}
