"use client";

import React, { useState, useEffect, useRef } from "react";

export interface AnimatedCounterProps {
  target: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  formatNumber?: boolean;
  decimals?: number;
  className?: string;
}

export default function AnimatedCounter({
  target,
  duration = 2400,
  prefix = "",
  suffix = "",
  formatNumber = false,
  decimals = 0,
  className = "",
}: AnimatedCounterProps) {
  const [count, setCount] = useState<number>(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const prevTargetRef = useRef<number>(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasAnimated) return;

    let startTimestamp: number | null = null;
    let animationFrameId: number;
    const startVal = prevTargetRef.current !== target ? 0 : 0;

    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const eased = easeOutCubic(progress);
      const currentVal = startVal + (target - startVal) * eased;

      setCount(currentVal);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        prevTargetRef.current = target;
      }
    };

    animationFrameId = requestAnimationFrame(step);

    return () => cancelAnimationFrame(animationFrameId);
  }, [hasAnimated, target, duration]);

  const formattedValue = () => {
    if (decimals > 0) {
      const fixed = count.toFixed(decimals);
      if (formatNumber) {
        const parts = fixed.split(".");
        parts[0] = Number(parts[0]).toLocaleString();
        return parts.join(".");
      }
      return fixed;
    }

    const rounded = Math.round(count);
    return formatNumber ? rounded.toLocaleString() : rounded.toString();
  };

  return (
    <span ref={elementRef} className={`tabular-nums ${className}`}>
      {prefix}
      {formattedValue()}
      {suffix}
    </span>
  );
}
