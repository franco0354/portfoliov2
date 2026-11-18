"use client";

import { useLayoutEffect, useRef, useState } from "react";
import "./draw-border.css";

type DrawBorderProps = {
  radius?: number;
  /** Use circular frame paths (for round avatars / photos). */
  circle?: boolean;
  /**
   * "default": center-out partial frame (philosophy cards).
   * "corners": four L-bracket corners at rest; gap lines sweep inward on hover.
   */
  variant?: "default" | "corners";
};

/**
 * Partial frame: top L/R arms + half sides + bottom center.
 * On hover, top & bottom span left↔right from center to complete the border.
 * With `circle`, draws partial arcs around a round frame instead.
 * With `variant="corners"`, shows four corner L-brackets at rest and fills
 * in the edge gaps on hover (corners-in design).
 */
export function DrawBorder({ radius = 8, circle = false, variant = "default" }: DrawBorderProps) {
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

  const pad = 2;
  const w = Math.max(0, box.w - pad * 2);
  const h = Math.max(0, box.h - pad * 2);
  const x = pad;
  const y = pad;
  const r = Math.min(radius, w / 2, h / 2);
  const cx = x + w / 2;
  const cy = y + h / 2;
  const bottom = y + h;
  const right = x + w;
  const midY = y + h * 0.5;
  const topGapHalf = Math.max(20, w * 0.28);
  const bottomCenterHalf = Math.max(8, w * 0.08);

  const readyRect =
    box.w > 0 && box.h > 0 && w >= r * 2 - 0.01 && h >= r * 2 - 0.01 && r > 0;

  const circleR = Math.min(w, h) / 2;
  const readyCircle = circle && box.w > 0 && box.h > 0 && circleR > 4;

  const polar = (angleDeg: number, radius = circleR) => {
    const rad = ((angleDeg - 90) * Math.PI) / 180;
    return {
      x: cx + radius * Math.cos(rad),
      y: cy + radius * Math.sin(rad),
    };
  };

  const arc = (from: number, to: number) => {
    const start = polar(from);
    const end = polar(to);
    const delta = ((to - from) % 360 + 360) % 360;
    const large = delta > 180 ? 1 : 0;
    return `M ${start.x} ${start.y} A ${circleR} ${circleR} 0 ${large} 1 ${end.x} ${end.y}`;
  };

  // Circle: side arms + small top/bottom centers; hover fills the gaps between them
  const circleTopLeft = readyCircle ? arc(205, 330) : "";
  const circleTopRight = readyCircle ? arc(30, 155) : "";
  const circleTopCenter = readyCircle ? arc(345, 375) : ""; // 345 → 15°
  const circleBottom = readyCircle ? arc(165, 195) : "";
  const circleTopLeftFill = readyCircle ? arc(330, 345) : "";
  const circleTopRightFill = readyCircle ? arc(15, 30) : "";
  const circleBottomLeftFill = readyCircle ? arc(155, 165) : "";
  const circleBottomRightFill = readyCircle ? arc(195, 205) : "";

  const topLeftPath = readyRect
    ? `M ${cx - topGapHalf} ${y} H ${x + r} A ${r} ${r} 0 0 0 ${x} ${y + r} V ${midY}`
    : "";
  const topRightPath = readyRect
    ? `M ${cx + topGapHalf} ${y} H ${right - r} A ${r} ${r} 0 0 1 ${right} ${y + r} V ${midY}`
    : "";
  const bottomCenterPath = readyRect
    ? `M ${cx - bottomCenterHalf} ${bottom} H ${cx + bottomCenterHalf}`
    : "";

  const topSpan = readyRect
    ? `M ${cx - topGapHalf} ${y} H ${cx + topGapHalf}`
    : "";
  const bottomLeftSpan = readyRect
    ? `M ${cx - bottomCenterHalf} ${bottom} H ${x + r} A ${r} ${r} 0 0 1 ${x} ${bottom - r} V ${midY}`
    : "";
  const bottomRightSpan = readyRect
    ? `M ${cx + bottomCenterHalf} ${bottom} H ${right - r} A ${r} ${r} 0 0 0 ${right} ${bottom - r} V ${midY}`
    : "";

  // ── corners variant ───────────────────────────────────────────────────────
  // Four L-bracket corner arms always visible; edge-gap lines animate in on hover.
  const cArmH = Math.max(18, w * 0.18); // horizontal arm length
  const cArmV = Math.max(18, h * 0.28); // vertical arm length

  const cornerTL = readyRect
    ? `M ${x + cArmH} ${y} H ${x + r} A ${r} ${r} 0 0 0 ${x} ${y + r} V ${y + cArmV}`
    : "";
  const cornerTR = readyRect
    ? `M ${right - cArmH} ${y} H ${right - r} A ${r} ${r} 0 0 1 ${right} ${y + r} V ${y + cArmV}`
    : "";
  const cornerBL = readyRect
    ? `M ${x + cArmH} ${bottom} H ${x + r} A ${r} ${r} 0 0 1 ${x} ${bottom - r} V ${bottom - cArmV}`
    : "";
  const cornerBR = readyRect
    ? `M ${right - cArmH} ${bottom} H ${right - r} A ${r} ${r} 0 0 0 ${right} ${bottom - r} V ${bottom - cArmV}`
    : "";

  // Gap-fill paths: animate from corner-arm endpoints inward to meet in edge center
  const gapTop = readyRect
    ? `M ${x + cArmH} ${y} H ${right - cArmH}`
    : "";
  const gapBottom = readyRect
    ? `M ${x + cArmH} ${bottom} H ${right - cArmH}`
    : "";
  const gapLeft = readyRect
    ? `M ${x} ${y + cArmV} V ${bottom - cArmV}`
    : "";
  const gapRight = readyRect
    ? `M ${right} ${y + cArmV} V ${bottom - cArmV}`
    : "";

  return (
    <svg
      ref={svgRef}
      className={`draw-border${variant === "corners" ? " draw-border--corners" : ""}`}
      width={box.w || "100%"}
      height={box.h || "100%"}
      aria-hidden="true"
    >
      {variant === "corners" ? (
        <>
          {cornerTL && <path className="draw-border-base" d={cornerTL} />}
          {cornerTR && <path className="draw-border-base" d={cornerTR} />}
          {cornerBL && <path className="draw-border-base" d={cornerBL} />}
          {cornerBR && <path className="draw-border-base" d={cornerBR} />}
          {gapTop && (
            <path className="draw-border-fill" pathLength="100" d={gapTop} />
          )}
          {gapBottom && (
            <path className="draw-border-fill" pathLength="100" d={gapBottom} />
          )}
          {gapLeft && (
            <path className="draw-border-fill" pathLength="100" d={gapLeft} />
          )}
          {gapRight && (
            <path className="draw-border-fill" pathLength="100" d={gapRight} />
          )}
        </>
      ) : circle ? (
        <>
          {circleTopLeft && (
            <path className="draw-border-base" d={circleTopLeft} />
          )}
          {circleTopRight && (
            <path className="draw-border-base" d={circleTopRight} />
          )}
          {circleTopCenter && (
            <path className="draw-border-base" d={circleTopCenter} />
          )}
          {circleBottom && (
            <path className="draw-border-base" d={circleBottom} />
          )}
          {circleTopLeftFill && (
            <path
              className="draw-border-fill"
              pathLength="100"
              d={circleTopLeftFill}
            />
          )}
          {circleTopRightFill && (
            <path
              className="draw-border-fill"
              pathLength="100"
              d={circleTopRightFill}
            />
          )}
          {circleBottomLeftFill && (
            <path
              className="draw-border-fill"
              pathLength="100"
              d={circleBottomLeftFill}
            />
          )}
          {circleBottomRightFill && (
            <path
              className="draw-border-fill"
              pathLength="100"
              d={circleBottomRightFill}
            />
          )}
        </>
      ) : (
        <>
          {topLeftPath && <path className="draw-border-base" d={topLeftPath} />}
          {topRightPath && (
            <path className="draw-border-base" d={topRightPath} />
          )}
          {bottomCenterPath && (
            <path className="draw-border-base" d={bottomCenterPath} />
          )}
          {topSpan && (
            <path className="draw-border-fill" pathLength="100" d={topSpan} />
          )}
          {bottomLeftSpan && (
            <path
              className="draw-border-fill"
              pathLength="100"
              d={bottomLeftSpan}
            />
          )}
          {bottomRightSpan && (
            <path
              className="draw-border-fill"
              pathLength="100"
              d={bottomRightSpan}
            />
          )}
        </>
      )}
    </svg>
  );
}
