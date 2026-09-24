"use client";

import React, { useState, useEffect, useRef } from "react";
import mapDataRaw from "@/data/australia_map_data.json";
import AnimatedCounter from "@/components/common/AnimatedCounter";
import { ZoomOut } from "lucide-react";

interface StateMapItem {
  code: string;
  name: string;
  d: string;
  center: [number, number];
  bounds: {
    minX: number;
    maxX: number;
    minY: number;
    maxY: number;
    width: number;
    height: number;
  };
  zoomViewBox: [number, number, number, number];
}

interface MapData {
  svgWidth: number;
  svgHeight: number;
  nationalViewBox: [number, number, number, number];
  states: Record<string, StateMapItem>;
}

const mapData = mapDataRaw as unknown as MapData;

interface StateInfo {
  name: string;
  employees: string;
  councils: number;
}

interface AustraliaInteractiveMapProps {
  selectedState: string; // "NATIONAL" | "NSW" | "NT" | ...
  onSelectState: (code: string) => void;
  statesData?: Record<string, StateInfo>;
  className?: string;
  highlightedState?: string;
  variant?: "default" | "defence" | "fire";
  compact?: boolean;
}

export default function AustraliaInteractiveMap({
  selectedState,
  onSelectState,
  statesData = {},
  className = "",
  highlightedState,
  variant = "default",
  compact = false,
}: AustraliaInteractiveMapProps) {
  const isNational = selectedState === "NATIONAL";

  // Initial target viewBox
  const getTargetViewBox = (code: string): [number, number, number, number] => {
    if (code === "NATIONAL" || !mapData.states[code]) {
      return mapData.nationalViewBox;
    }
    return mapData.states[code].zoomViewBox;
  };

  const [currentViewBox, setCurrentViewBox] = useState<[number, number, number, number]>(() =>
    mapData.nationalViewBox
  );

  const [hoveredState, setHoveredState] = useState<string | null>(null);
  const [tooltipData, setTooltipData] = useState<{
    code: string;
    name: string;
    x: number;
    y: number;
  } | null>(null);
  const [isZoomComplete, setIsZoomComplete] = useState<boolean>(() => selectedState === "NATIONAL");

  const prevSelectedStateRef = useRef<string | null>(null);
  const currentViewBoxRef = useRef(currentViewBox);
  const animFrameRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    currentViewBoxRef.current = currentViewBox;
  }, [currentViewBox]);

  // Smooth Google Maps-style camera zoom interpolation
  useEffect(() => {
    prevSelectedStateRef.current = selectedState;

    const targetVB = getTargetViewBox(selectedState);
    const startVB = [...currentViewBoxRef.current] as [number, number, number, number];

    // If starting and target are already effectively equal, skip
    const isSame =
      Math.abs(startVB[0] - targetVB[0]) < 1 &&
      Math.abs(startVB[1] - targetVB[1]) < 1 &&
      Math.abs(startVB[2] - targetVB[2]) < 1 &&
      Math.abs(startVB[3] - targetVB[3]) < 1;

    if (isSame) {
      setCurrentViewBox(targetVB);
      setIsZoomComplete(true);
      return;
    }

    setIsZoomComplete(false);
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
    }

    const duration = 950; // smooth 950ms camera glide
    const startTime = performance.now();

    // Smooth cubic-bezier easeOut curve
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      const ease = easeOutCubic(progress);

      const nextVB: [number, number, number, number] = [
        +(startVB[0] + (targetVB[0] - startVB[0]) * ease).toFixed(2),
        +(startVB[1] + (targetVB[1] - startVB[1]) * ease).toFixed(2),
        +(startVB[2] + (targetVB[2] - startVB[2]) * ease).toFixed(2),
        +(startVB[3] + (targetVB[3] - startVB[3]) * ease).toFixed(2),
      ];

      setCurrentViewBox(nextVB);

      if (progress < 1) {
        animFrameRef.current = requestAnimationFrame(step);
      } else {
        setCurrentViewBox(targetVB);
        setIsZoomComplete(true);
      }
    };

    animFrameRef.current = requestAnimationFrame(step);

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [selectedState]);

  const handleStateMouseEnter = (code: string, e: React.MouseEvent) => {
    if (!isNational) return;
    setHoveredState(code);
    updateTooltipPos(e, code);
  };

  const handleStateMouseMove = (code: string, e: React.MouseEvent) => {
    if (!isNational) return;
    updateTooltipPos(e, code);
  };

  const handleStateMouseLeave = () => {
    setHoveredState(null);
    setTooltipData(null);
  };

  const updateTooltipPos = (e: React.MouseEvent, code: string) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const stateItem = mapData.states[code];
    setTooltipData({
      code,
      name: stateItem?.name || code,
      x,
      y,
    });
  };

  const handleStateClick = (code: string) => {
    if (code === "ACT") {
      // ACT is typically treated under NSW in LG reporting or selectable directly
      onSelectState("NSW");
    } else {
      onSelectState(code);
    }
  };

  const currentStateInfo = statesData[selectedState];

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden select-none flex flex-col items-center justify-center ${className}`}
      style={{ minHeight: compact ? "330px" : isNational ? "460px" : "420px" }}
    >
      {/* Zoom / Reset to National Button in State View */}
      {!isNational && (
        <div className="absolute top-4 left-4 z-20 animate-fade-in">
          <button
            onClick={() => onSelectState("NATIONAL")}
            className="bg-white/90 hover:bg-white text-gray800 border border-gray200 shadow-sm hover:shadow px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer group"
          >
            <ZoomOut className="w-3.5 h-3.5 text-[#046D2A] group-hover:scale-110 transition-transform" />
            <span>Full Australia</span>
          </button>
        </div>
      )}

      {/* SVG Map Container */}
      <svg
        viewBox={`${currentViewBox[0]} ${currentViewBox[1]} ${currentViewBox[2]} ${currentViewBox[3]}`}
        className="w-full h-auto max-h-[560px] object-contain transition-[filter] duration-500"
        style={{ willChange: "transform" }}
      >
        <defs>
          <filter id="activeStateGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#046D2A" floodOpacity="0.35" />
          </filter>
          <filter id="hoverGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#8AC900" floodOpacity="0.5" />
          </filter>
        </defs>

        <g className="transition-all duration-700">
          {Object.values(mapData.states).map((state) => {
            const isSelected = selectedState === state.code;
            const isHovered = hoveredState === state.code;

            // Map color is #9CAA54 for all states
            let fill = variant === "defence" ? "#F0DEB6" : variant === "fire" ? "#F8E8E3" : "#9CAA54";
            let opacity = 1;
            let stroke = isNational ? "#ffffff" : "none";
            let strokeWidth = isNational ? 1.5 : 0;
            const filter = "none";

            if (isNational) {
              if ((variant === "defence" || variant === "fire") && highlightedState === state.code) {
                fill = variant === "fire" ? "#D95222" : "#D7A31A";
              } else if (isHovered) {
                fill = variant === "defence" ? "#E5C36E" : variant === "fire" ? "#E78A69" : "#8AC900";
                stroke = "#ffffff";
                strokeWidth = 2;
              }
            } else {
              // Zoomed State View - no white border, map in #9CAA54
              if (isSelected) {
                fill = "#9CAA54";
                stroke = "none";
                strokeWidth = 0;
                opacity = 1;
              } else {
                // Surrounding states in zoomed state view: dimmed for geographic context, no white border
                opacity = 0.28;
                fill = "#D3DCBA";
                stroke = "none";
                strokeWidth = 0;
              }
            }

            // Exact label positions matching reference image:
            // WA: [215, 312]
            // NT: [404, 205]
            // SA: [427, 385]
            // QLD: shifted left [572, 258]
            // NSW: shifted left [602, 435]
            // VIC: [575, 498]
            // TAS: [538, 608]
            const labelPositions: Record<string, [number, number]> = {
              WA: [215, 312],
              NT: [404, 205],
              SA: [427, 385],
              QLD: [572, 258],
              NSW: [602, 435],
              VIC: [575, 498],
              TAS: [538, 608],
            };

            const [labelX, labelY] = labelPositions[state.code] || state.center;

            return (
              <g key={state.code} className="transition-all duration-500">
                <path
                  d={state.d}
                  fill={fill}
                  stroke={stroke}
                  strokeWidth={strokeWidth}
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  opacity={opacity}
                  filter={filter}
                  className={`transition-all duration-300 ${
                    isNational ? "cursor-pointer hover:brightness-105" : "cursor-default"
                  }`}
                  onMouseEnter={(e) => handleStateMouseEnter(state.code, e)}
                  onMouseMove={(e) => handleStateMouseMove(state.code, e)}
                  onMouseLeave={handleStateMouseLeave}
                  onClick={() => isNational && handleStateClick(state.code)}
                />

                {/* State Label: Pill badge with short code (bg: #046D2A, border: 1px gray200) + long name below (only in national view) */}
                {isNational && state.code !== "ACT" && (
                  <g
                    className={`transition-all duration-300 pointer-events-none select-none ${
                      isHovered ? "scale-105" : ""
                    }`}
                    style={{ transformOrigin: `${labelX}px ${labelY}px` }}
                  >
                    {/* Badge Pill: short format (wider for easy readability, perfect pill radius) */}
                    <rect
                      x={labelX - 25}
                      y={labelY - 32}
                      width={50}
                      height={32}
                      rx={16}
                      ry={16}
                      fill={variant === "defence" ? (highlightedState === state.code ? "#61645E" : "#D7A31A") : variant === "fire" ? "#D95222" : "#046D2A"}
                      stroke="#E5E7EB"
                      strokeWidth={1.2}
                    />
                    {/* Short Code Text (larger, bold, clear white, plain text no shadow) */}
                    <text
                      x={labelX}
                      y={labelY - 16}
                      textAnchor="middle"
                      dominantBaseline="central"
                      fill="#ffffff"
                      fontSize="14"
                      fontWeight="700"
                      fontFamily="inherit"
                    >
                      {state.code}
                    </text>

                    {/* Long format state name (readable, plain text without shadow) */}
                    {state.code === "TAS" ? (
                      /* Tasmania: label placed to the left of the pill badge */
                      <text
                        x={labelX - 32}
                        y={labelY - 16}
                        textAnchor="end"
                        dominantBaseline="central"
                        fill="#1F2937"
                        fontSize="11"
                        fontWeight="600"
                        fontFamily="inherit"
                      >
                        Tasmania
                      </text>
                    ) : state.code === "NSW" ? (
                      <>
                        <text
                          x={labelX}
                          y={labelY + 11}
                          textAnchor="middle"
                          fill="#1F2937"
                          fontSize="11"
                          fontWeight="600"
                          fontFamily="inherit"
                        >
                          New South
                        </text>
                        <text
                          x={labelX}
                          y={labelY + 25}
                          textAnchor="middle"
                          fill="#1F2937"
                          fontSize="11"
                          fontWeight="600"
                          fontFamily="inherit"
                        >
                          Wales
                        </text>
                      </>
                    ) : state.code === "NT" ? (
                      <>
                        <text
                          x={labelX}
                          y={labelY + 11}
                          textAnchor="middle"
                          fill="#1F2937"
                          fontSize="11"
                          fontWeight="600"
                          fontFamily="inherit"
                        >
                          Northern
                        </text>
                        <text
                          x={labelX}
                          y={labelY + 25}
                          textAnchor="middle"
                          fill="#1F2937"
                          fontSize="11"
                          fontWeight="600"
                          fontFamily="inherit"
                        >
                          Territory
                        </text>
                      </>
                    ) : state.code === "WA" ? (
                      <>
                        <text
                          x={labelX}
                          y={labelY + 11}
                          textAnchor="middle"
                          fill="#1F2937"
                          fontSize="11"
                          fontWeight="600"
                          fontFamily="inherit"
                        >
                          Western
                        </text>
                        <text
                          x={labelX}
                          y={labelY + 25}
                          textAnchor="middle"
                          fill="#1F2937"
                          fontSize="11"
                          fontWeight="600"
                          fontFamily="inherit"
                        >
                          Australia
                        </text>
                      </>
                    ) : state.code === "SA" ? (
                      <>
                        <text
                          x={labelX}
                          y={labelY + 11}
                          textAnchor="middle"
                          fill="#1F2937"
                          fontSize="11"
                          fontWeight="600"
                          fontFamily="inherit"
                        >
                          South
                        </text>
                        <text
                          x={labelX}
                          y={labelY + 25}
                          textAnchor="middle"
                          fill="#1F2937"
                          fontSize="11"
                          fontWeight="600"
                          fontFamily="inherit"
                        >
                          Australia
                        </text>
                      </>
                    ) : (
                      <text
                        x={labelX}
                        y={labelY + 14}
                        textAnchor="middle"
                        fill="#1F2937"
                        fontSize="11"
                        fontWeight="600"
                        fontFamily="inherit"
                      >
                        {state.name}
                      </text>
                    )}
                  </g>
                )}
              </g>
            );
          })}
        </g>
      </svg>

      {/* Interactive Tooltip in National View */}
      {isNational && tooltipData && (
        <div
          className="absolute z-30 pointer-events-none transform -translate-x-1/2 -translate-y-full mb-3 animate-fade-in"
          style={{
            left: `${tooltipData.x}px`,
            top: `${tooltipData.y - 12}px`,
          }}
        >
          <div className="bg-[#1B240E] text-white text-xs rounded-xl px-3.5 py-2.5 shadow-xl border border-white/10 whitespace-nowrap space-y-1">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-xs bg-[#8AC900] shrink-0" />
              <span className="font-bold text-sm text-[#FAFAF0]">
                {tooltipData.name}
              </span>
            </div>
            {statesData[tooltipData.code] && (
              <div className="text-[11px] text-white/80 space-y-0.5 pt-0.5">
                <div>
                  <span className="text-white/60">Employees:</span>{" "}
                  <span className="font-bold text-[#B2DB79]">
                    {statesData[tooltipData.code].employees}
                  </span>
                </div>
                <div>
                  <span className="text-white/60">Councils:</span>{" "}
                  <span className="font-bold text-white">
                    {statesData[tooltipData.code].councils}
                  </span>
                </div>
              </div>
            )}
            <div className="text-[10px] text-[#8AC900] font-semibold pt-1 border-t border-white/10">
              Click to view state →
            </div>
          </div>
          {/* Tooltip caret */}
          <div className="w-2.5 h-2.5 bg-[#1B240E] rotate-45 mx-auto -mt-1 shadow-md border-r border-b border-white/10" />
        </div>
      )}

      {/* Overlaid Stat Badges when Zoomed into a Specific State */}
      {!isNational && currentStateInfo && (
        <div
          className={`absolute inset-0 pointer-events-none transition-opacity duration-500 flex flex-col justify-between p-4 sm:p-6 ${
            isZoomComplete ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Stat Overlay Card 1: Employees (Top Left) */}
          <div className="self-start bg-white/95 backdrop-blur-xs rounded-xl shadow-md border border-gray200/80 p-3 min-w-28 sm:min-w-32 relative pointer-events-auto transform animate-card-entrance mt-8">
            <span className="text-xl sm:text-2xl font-bold text-[#046D2A] block leading-tight">
              <AnimatedCounter
                key={`${selectedState}-map-emp`}
                target={Number(currentStateInfo.employees.replace(/,/g, "")) || 0}
                formatNumber={true}
              />
            </span>
            <span className="text-xs font-semibold text-gray600">Employees</span>
            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white rotate-45 rounded-xs shadow-[2px_2px_3px_rgba(0,0,0,0.08)]" />
          </div>

          {/* Stat Overlay Card 2: Local Councils (Bottom Right) */}
          <div className="self-end bg-white/95 backdrop-blur-xs rounded-xl shadow-md border border-gray200/80 p-3 min-w-28 sm:min-w-32 relative pointer-events-auto transform animate-card-entrance mb-2">
            <span className="text-xl sm:text-2xl font-bold text-[#046D2A] block leading-tight">
              <AnimatedCounter
                key={`${selectedState}-map-councils`}
                target={currentStateInfo.councils}
              />
            </span>
            <span className="text-xs font-semibold text-gray600">Local councils</span>
            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white rotate-45 rounded-xs shadow-[2px_2px_3px_rgba(0,0,0,0.08)]" />
          </div>
        </div>
      )}
    </div>
  );
}
