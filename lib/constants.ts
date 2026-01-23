/**
 * Theme constants for consistent design across the application
 */

export const theme = {
  colors: {
    primary: {
      main: "#b42519",
      dark: "#7a160d",
      light: "#b42519",
    },
    secondary: {
      main: "#d2a741",
      dark: "#ad8934",
      light: "#d2a741",
    },
    text: {
      primary: "#1f2937",
      secondary: "#6b7280",
      muted: "#9ca3af",
    },
    background: {
      white: "#ffffff",
      gray: "#f9fafb",
    },
  },
  spacing: {
    section: {
      py: "py-16",
      pyMd: "md:py-20",
    },
    container: {
      px: "px-4",
      maxWidth: "max-w-6xl",
    },
    gap: {
      sm: "gap-4",
      md: "gap-6",
      lg: "gap-8",
    },
  },
  shadows: {
    card: "shadow-lg",
    cardHover: "hover:shadow-xl",
    button: "shadow-md",
  },
  transitions: {
    default: "transition-all duration-300",
    fast: "transition-all duration-200",
    slow: "transition-all duration-500",
  },
  borderRadius: {
    card: "rounded-2xl",
    button: "rounded-full",
    input: "rounded-full",
  },
} as const;
