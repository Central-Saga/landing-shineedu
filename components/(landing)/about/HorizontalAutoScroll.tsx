"use client";

import {
  useRef,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

interface HorizontalAutoScrollProps {
  children: ReactNode;
  className?: string;
  /** Kecepatan auto-scroll (px per tick) */
  speed?: number;
  /** Interval dalam ms */
  intervalMs?: number;
  /** Teks saat auto-scroll jalan */
  labelPlay?: string;
  /** Teks saat dijeda */
  labelPause?: string;
}

/**
 * Area scroll horizontal: scrollbar disembunyikan, auto-scroll.
 * Klik area atau tombol untuk jeda; saat jeda pengguna bisa scroll manual (wheel / drag).
 */
export function HorizontalAutoScroll({
  children,
  className,
  speed = 2,
  intervalMs = 20,
  labelPlay = "Putar auto-scroll",
  labelPause = "Jeda — geser manual",
}: HorizontalAutoScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const rafRef = useRef<number | null>(null);
  const dragRef = useRef({ isDragging: false, startX: 0, startScrollLeft: 0 });
  const didDragRef = useRef(false);

  // Auto-scroll: pakai requestAnimationFrame agar smooth dan layout sudah siap
  useEffect(() => {
    if (isPaused) return;
    const el = containerRef.current;
    if (!el) return;

    let last = 0;
    const step = (now: number) => {
      rafRef.current = requestAnimationFrame(step);
      const dt = now - last;
      if (dt < intervalMs) return;
      last = now;
      const max = el.scrollWidth - el.clientWidth;
      if (max <= 0) return;
      el.scrollLeft += speed;
      if (el.scrollLeft >= max - 1) {
        el.scrollLeft = 0;
      }
    };
    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [isPaused, speed, intervalMs]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!dragRef.current.isDragging) return;
    didDragRef.current = true;
    const el = containerRef.current;
    if (!el) return;
    const dx = dragRef.current.startX - e.clientX;
    el.scrollLeft = dragRef.current.startScrollLeft + dx;
  }, []);

  const handleMouseUp = useCallback(() => {
    dragRef.current.isDragging = false;
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);
  }, [handleMouseMove]);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (e.button !== 0) return;
      didDragRef.current = false;
      const el = containerRef.current;
      if (!el) return;
      dragRef.current = {
        isDragging: true,
        startX: e.clientX,
        startScrollLeft: el.scrollLeft,
      };
      setIsPaused(true);
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    },
    [handleMouseMove, handleMouseUp]
  );

  const handleClick = useCallback(() => {
    if (didDragRef.current) {
      didDragRef.current = false;
      return;
    }
    setIsPaused((p) => !p);
  }, []);

  const handleWheel = useCallback(() => {
    setIsPaused(true);
  }, []);

  const handleTouchStart = useCallback(() => {
    setIsPaused(true);
  }, []);

  return (
    <div className={cn("w-full", className)}>
      <div
        ref={containerRef}
        role="region"
        aria-label="Slideshow guru, klik untuk jeda atau putar"
        tabIndex={0}
        onClick={handleClick}
        onMouseDown={handleMouseDown}
        onWheel={handleWheel}
        onTouchStart={handleTouchStart}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setIsPaused((p) => !p);
          }
        }}
        className={cn(
          "flex flex-nowrap gap-4 overflow-x-auto overflow-y-hidden pb-4 -mx-4 px-4 items-stretch",
          "cursor-grab active:cursor-grabbing select-none",
          "[scrollbar-width:none] [-ms-overflow-style:none]",
          "[&::-webkit-scrollbar]:hidden",
          "touch-pan-x"
        )}
        style={{ scrollBehavior: isPaused ? "smooth" : "auto" }}
      >
        {children}
      </div>
      <p className="text-xs text-gray-400 mt-2 flex items-center justify-end gap-2">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setIsPaused((p) => !p);
          }}
          className="underline hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#b42519]/30 rounded"
        >
          {isPaused ? labelPlay : labelPause}
        </button>
      </p>
    </div>
  );
}
