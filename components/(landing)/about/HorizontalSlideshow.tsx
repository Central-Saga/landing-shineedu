"use client";

import { ReactNode, Children, isValidElement } from "react";
import { cn } from "@/lib/utils";

interface HorizontalSlideshowProps {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  /** Lebar minimal setiap item (untuk konsistensi kartu) */
  itemMinWidth?: string;
  /** Sembunyikan scrollbar */
  hideScrollbar?: boolean;
}

/**
 * Slideshow horizontal: jika konten melebihi lebar browser,
 * pengguna bisa scroll horizontal (overflow-x-auto).
 */
export function HorizontalSlideshow({
  title,
  subtitle,
  children,
  className,
  itemMinWidth = "min-w-[280px]",
  hideScrollbar = false,
}: HorizontalSlideshowProps) {
  return (
    <div className={cn("w-full", className)}>
      {(title || subtitle) && (
        <div className="mb-6">
          {title && (
            <h3 className="text-xl md:text-2xl font-bold text-[#b42519] mb-1">
              {title}
            </h3>
          )}
          {subtitle && (
            <p className="text-gray-600 text-sm md:text-base">{subtitle}</p>
          )}
        </div>
      )}
      <div
        className={cn(
          "flex gap-4 overflow-x-auto pb-4 -mx-4 px-4",
          "scroll-smooth snap-x snap-mandatory",
          hideScrollbar
            ? "[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            : "[scrollbar-width:thin] [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-thumb]:rounded [&::-webkit-scrollbar-thumb]:bg-gray-300"
        )}
      >
        {Children.map(children, (child, i) =>
          isValidElement(child) ? (
            <div key={i} className={cn("shrink-0 snap-center", itemMinWidth)}>
              {child}
            </div>
          ) : (
            child
          )
        )}
      </div>
      <p className="text-xs text-gray-400 mt-2 text-right">
        Geser ke samping untuk melihat lebih banyak
      </p>
    </div>
  );
}
