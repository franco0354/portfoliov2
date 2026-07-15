"use client";

import { useLayoutEffect, useRef, useState } from "react";
import "./draw-border.css";

type DrawBorderProps = {
  radius?: number;
};

/**
 * Partial frame: top L/R arms + half sides + bottom center.
 * On hover, top & bottom span left↔right from center to complete the border.
 */
export function DrawBorder({ radius = 8 }: DrawBorderProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [box, setBox] = useState({ w: 0, h: 0 });

  useLayoutEffect(() => {
    const parent = svgRef.current?.parentElement;
    if (!parent) return;

    const update = () => {
      const { width, height } = parent.getBoundingClientRect();
      setBox({
        w: Math.max(0, Math.round(width * 100) / 100),
        h: Math.max(0, Math.round(height * 100) / 100),
      });
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(parent);
    return () => observer.disconnect();
  }, []);

  const pad = 1.5;
  const w = Math.max(0, box.w - pad * 2);
  const h = Math.max(0, box.h - pad * 2);
  const x = pad;
  const y = pad;
  const r = Math.min(radius, w / 2, h / 2);
  const cx = x + w / 2;
  const bottom = y + h;
  const right = x + w;
  const midY = y + h * 0.5;
  // Top gap is larger; bottom center segment is smaller
  const topGapHalf = Math.max(20, w * 0.28);
  const bottomCenterHalf = Math.max(8, w * 0.08);

  const ready = box.w > 0 && box.h > 0 && w > r * 2 && h > r * 2;

  const topLeftPath = ready
    ? `M ${cx - topGapHalf} ${y} H ${x + r} A ${r} ${r} 0 0 0 ${x} ${y + r} V ${midY}`
    : "";
  const topRightPath = ready
    ? `M ${cx + topGapHalf} ${y} H ${right - r} A ${r} ${r} 0 0 1 ${right} ${y + r} V ${midY}`
    : "";
  const bottomCenterPath = ready
    ? `M ${cx - bottomCenterHalf} ${bottom} H ${cx + bottomCenterHalf}`
    : "";

  const topSpan = ready
    ? `M ${cx - topGapHalf} ${y} H ${cx + topGapHalf}`
    : "";
  const bottomLeftSpan = ready
    ? `M ${cx - bottomCenterHalf} ${bottom} H ${x + r} A ${r} ${r} 0 0 1 ${x} ${bottom - r} V ${midY}`
    : "";
  const bottomRightSpan = ready
    ? `M ${cx + bottomCenterHalf} ${bottom} H ${right - r} A ${r} ${r} 0 0 0 ${right} ${bottom - r} V ${midY}`
    : "";

  return (
    <svg
      ref={svgRef}
      className="draw-border"
      width={box.w || "100%"}
      height={box.h || "100%"}
      aria-hidden="true"
    >
      {topLeftPath && <path className="draw-border-base" d={topLeftPath} />}
      {topRightPath && <path className="draw-border-base" d={topRightPath} />}
      {bottomCenterPath && (
        <path className="draw-border-base" d={bottomCenterPath} />
      )}
      {topSpan && (
        <path className="draw-border-fill" pathLength="100" d={topSpan} />
      )}
      {bottomLeftSpan && (
        <path className="draw-border-fill" pathLength="100" d={bottomLeftSpan} />
      )}
      {bottomRightSpan && (
        <path className="draw-border-fill" pathLength="100" d={bottomRightSpan} />
      )}
    </svg>
  );
}
