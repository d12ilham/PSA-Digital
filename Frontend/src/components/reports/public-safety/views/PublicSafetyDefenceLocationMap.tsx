"use client";

import { useEffect, useState } from "react";

export const defenceLocations = {
  NSW: { name: "New South Wales", values: ["16,415", "9,010", "22"] },
  NT: { name: "Northern Territory", values: ["4,179", "970", "5"] },
  QLD: { name: "Queensland", values: ["16,081", "8,254", "11"] },
  SA: { name: "South Australia", values: ["3,234", "2,564", "9"] },
  TAS: { name: "Tasmania", values: ["93", "633", "3"] },
  VIC: { name: "Victoria", values: ["5,872", "4,440", "9"] },
  WA: { name: "Western Australia", values: ["4,276", "3,173", "10"] },
  ACT: { name: "Australian Capital Territory", values: ["7,691", "4,185", "9"] },
} as const;

export type DefenceLocation = keyof typeof defenceLocations | "NAT";

/** Keep Figma's exported paths and labels intact; bind selection to its layer IDs. */
export default function PublicSafetyDefenceLocationMap({ selected, onSelect, className }: {
  selected: DefenceLocation;
  onSelect: (state: DefenceLocation) => void;
  className?: string;
}) {
  const [mapDocument, setMapDocument] = useState<Document | null>(null);

  useEffect(() => {
    if (!mapDocument) return;
    const svg = mapDocument.documentElement;
    svg.setAttribute("role", "group");
    svg.setAttribute("aria-label", "Australian Defence Force workforce by jurisdiction");
    const interactionStyle = mapDocument.createElementNS("http://www.w3.org/2000/svg", "style");
    interactionStyle.textContent = `
      [role="button"] {
        cursor: pointer;
        outline: none;
        transition: fill-opacity .25s, filter .25s;
      }
      [role="button"]:hover { filter: brightness(.95); }
      [role="button"]:focus-visible { stroke: #598303; stroke-width: 2.5; }
      @media (prefers-reduced-motion: no-preference) {
        [data-map-reveal]:not(:focus-visible) {
          animation: map-reveal .4s ease-out backwards;
          animation-delay: var(--map-reveal-delay);
        }
      }
      @keyframes map-reveal {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      @media (prefers-reduced-motion: reduce) {
        [role="button"] { transition: none; }
      }
    `;
    const cleanup: (() => void)[] = [];

    for (const [index, [key, location]] of Object.entries(defenceLocations).entries()) {
      const state = key as keyof typeof defenceLocations;
      const shape = mapDocument.getElementById(`AU${state}`);
      const badge = mapDocument.getElementById(state)?.parentElement;
      const name = mapDocument.getElementById(location.name);
      if (!shape) continue;
      shape.setAttribute("role", "button");
      shape.setAttribute("tabindex", "0");
      shape.setAttribute("aria-label", `Show ${location.name} workforce`);
      const select = () => onSelect(state);
      const keyboard = (event: Event) => {
        const keyEvent = event as KeyboardEvent;
        if (keyEvent.key === "Enter" || keyEvent.key === " ") {
          keyEvent.preventDefault();
          select();
        }
      };
      for (const target of [shape, badge, name]) {
        if (!target) continue;
        target.addEventListener("click", select);
        target.style.cursor = "pointer";
        target.setAttribute("data-map-reveal", "");
        target.style.setProperty("--map-reveal-delay", `${index * 55}ms`);
        cleanup.push(() => {
          target.removeEventListener("click", select);
          target.removeAttribute("data-map-reveal");
          target.style.removeProperty("--map-reveal-delay");
        });
      }
      shape.addEventListener("keydown", keyboard);
      cleanup.push(() => shape.removeEventListener("keydown", keyboard));
    }
    svg.appendChild(interactionStyle);
    return () => { cleanup.forEach((remove) => remove()); interactionStyle.remove(); };
  }, [mapDocument, onSelect]);

  useEffect(() => {
    if (!mapDocument) return;
    for (const [state, location] of Object.entries(defenceLocations)) {
      const active = selected === state;
      const shape = mapDocument.getElementById(`AU${state}`);
      shape?.setAttribute("fill", "#D3992C");
      shape?.setAttribute("fill-opacity", active ? "1" : "0.2");
      shape?.setAttribute("aria-pressed", String(active));
      const badge = mapDocument.getElementById(state)?.parentElement;
      badge?.firstElementChild?.setAttribute("fill", active ? "#64645E" : "#D3992C");
      mapDocument.getElementById(location.name)?.setAttribute("fill", active ? "white" : "#252D02");
    }
  }, [mapDocument, selected]);

  return <object className={className} type="image/svg+xml" data="/images/reports/public-safety/defence-location-map.svg" aria-label="Interactive ADF location map; use the jurisdiction buttons to select a location" onLoad={(event) => setMapDocument(event.currentTarget.contentDocument)}>
    <p>Select a jurisdiction above to view the approved ADF workforce figures.</p>
  </object>;
}
