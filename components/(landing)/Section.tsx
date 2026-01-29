import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
  padding?: "none" | "sm" | "md" | "lg";
  background?: "white" | "gray" | "transparent";
}

const paddingClasses = {
  none: "",
  sm: "py-8 md:py-12",
  md: "py-12 md:py-16",
  lg: "py-16 md:py-20",
};

const backgroundClasses = {
  white: "bg-white",
  gray: "bg-gray-50",
  transparent: "bg-transparent",
};

export const Section = ({ 
  children, 
  id,
  className,
  padding = "lg",
  background = "white"
}: SectionProps) => {
  return (
    <section 
      id={id}
      className={cn(
        "relative overflow-hidden",
        paddingClasses[padding],
        backgroundClasses[background],
        className
      )}
    >
      {children}
    </section>
  );
};
