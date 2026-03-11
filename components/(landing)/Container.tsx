import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "7xl" | "full";
}

const maxWidthClasses = {
  sm: "max-w-screen-sm",
  md: "max-w-screen-md",
  lg: "max-w-screen-lg",
  xl: "max-w-screen-xl",
  "2xl": "max-w-screen-2xl",
  "7xl": "max-w-7xl",
  full: "max-w-full",
};

export const Container = ({ 
  children, 
  className,
  maxWidth = "full"
}: ContainerProps) => {
  return (
    <div 
      className={cn(
        "container mx-auto px-4",
        maxWidth !== "full" && maxWidthClasses[maxWidth],
        className
      )}
    >
      {children}
    </div>
  );
};
