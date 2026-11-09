"use client";

import { useEffect, useRef, type ReactNode } from "react";
import styles from "./ReportSelectionPanel.module.css";

export default function ReportSelectionPanel({ selection, label, children }: {
  selection: number;
  label: string;
  children: ReactNode;
}) {
  const panel = useRef<HTMLDivElement>(null);
  const previousSelection = useRef(selection);

  useEffect(() => {
    const element = panel.current;
    if (!element || previousSelection.current === selection) return;
    previousSelection.current = selection;
    element.scrollTop = 0;
    if (window.matchMedia("(min-width: 1200px)").matches) {
      const { top } = element.getBoundingClientRect();
      if (top < 84 || top >= window.innerHeight) {
        window.scrollBy({ top: top - 84, behavior: "instant" });
      }
    }
  }, [selection]);

  return <div ref={panel} className={styles.panel} role="region" aria-label={label} tabIndex={0}>
    {children}
  </div>;
}
