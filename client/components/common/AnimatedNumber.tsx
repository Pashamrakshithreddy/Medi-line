import { useEffect, useRef, useState } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

export type AnimatedNumberProps = {
  value: number;
  suffix?: string;
};

export const AnimatedNumber = ({ value, suffix = "" }: AnimatedNumberProps) => {
  const ref = useRef<HTMLSpanElement | null>(null);
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, {
    stiffness: 90,
    damping: 18,
    mass: 0.4,
  });
  const isInView = useInView(ref, { once: true, margin: "-120px" });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const unsubscribe = spring.on("change", (latest) => {
      setDisplayValue(Number(latest.toFixed(0)));
    });
    return () => unsubscribe();
  }, [spring]);

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, motionValue, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {displayValue}
      {suffix}
    </span>
  );
};
