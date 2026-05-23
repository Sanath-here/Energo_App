import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';

type TextFitProps = {
  text: string;
  className?: string;
  /** Max font size in px */
  maxFontSize?: number;
  /** Min font size in px */
  minFontSize?: number;
  /** Step to reduce in px */
  step?: number;
  /** CSS line-height (number or px) */
  lineHeight?: number | string;
  /** If true, only adjust font-size; if false also allow wrapping */
  allowWrap?: boolean;
  style?: React.CSSProperties;
};

/**
 * Simple text fitter that adjusts font-size so the rendered text fits inside its own container.
 * Works well for short/medium paragraphs.
 */
const TextFit: React.FC<TextFitProps> = ({
  text,
  className,
  maxFontSize = 22,
  minFontSize = 12,
  step = 1,
  lineHeight = 1.35,
  allowWrap = true,
  style,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [fontSize, setFontSize] = useState<number>(maxFontSize);

  const baseStyle = useMemo<React.CSSProperties>(
    () => ({
      fontSize,
      lineHeight,
      ...(allowWrap ? { whiteSpace: 'pre-wrap', wordBreak: 'break-word' } : { whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }),
    }),
    [fontSize, lineHeight, allowWrap]
  );

  const measureAndFit = () => {
    const el = containerRef.current;
    if (!el) return;

    const contentEl = el;

    // Reset to max then shrink until it fits.
    let next = maxFontSize;
    setFontSize(next);

    // Use layout effect sync on next render.
    // Fallback: perform a loop using direct style changes (best effort).
    contentEl.style.fontSize = `${next}px`;

    const maxW = contentEl.clientWidth;
    const maxH = contentEl.clientHeight;

    // If container has no size yet, bail.
    if (!maxW || !maxH) return;

    // Iterate down.
    // Note: dialog containers are flex children; sometimes clientHeight is 0 early on.
    // In that case we only fit by width (still prevents horizontal overflow).
    const targetW = maxW || contentEl.parentElement?.clientWidth || 0;
    const targetH = maxH || contentEl.parentElement?.clientHeight || 0;

    for (let fs = maxFontSize; fs >= minFontSize; fs -= step) {
      contentEl.style.fontSize = `${fs}px`;

      const fitsW =
        targetW === 0 ||
        contentEl.scrollWidth <= contentEl.clientWidth + 0.5;

      const fitsH =
        targetH === 0 ||
        contentEl.scrollHeight <= contentEl.clientHeight + 0.5;

      if (fitsW && fitsH) {
        next = fs;
        break;
      }
    }

    setFontSize(next);
  };

  useLayoutEffect(() => {
    measureAndFit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, maxFontSize, minFontSize, step, allowWrap, lineHeight]);

  useEffect(() => {
    if (!('ResizeObserver' in window)) return;
    const el = containerRef.current;
    if (!el) return;

    const ro = new ResizeObserver(() => {
      measureAndFit();
    });
    ro.observe(el);
    return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={containerRef} className={className} style={{ ...style }}>
      <span style={baseStyle}>{text}</span>
    </div>
  );
};

export default TextFit;

