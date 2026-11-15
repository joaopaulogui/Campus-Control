import * as React from "react"

export const TAILWIND_BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const

export type Breakpoint = keyof typeof TAILWIND_BREAKPOINTS

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = React.useState<boolean>(() => {
    if (typeof window === "undefined") return false
    return window.matchMedia(query).matches
  })

  React.useEffect(() => {
    const mql = window.matchMedia(query)
    const onChange = (event: MediaQueryListEvent) => setMatches(event.matches)

    setMatches(mql.matches)
    mql.addEventListener("change", onChange)
    return () => mql.removeEventListener("change", onChange)
  }, [query])

  return matches
}

/**
 * Segue a mesma regra mobile-first do Tailwind (`min-width`).
 * Ex: `useBreakpoint("md")` retorna `true` quando `width >= 768px` (equivalente ao prefixo `md:`).
 */
export function useBreakpoint(breakpoint: Breakpoint): boolean {
  const minWidth = TAILWIND_BREAKPOINTS[breakpoint]
  return useMediaQuery(`(min-width: ${minWidth}px)`)
}

/**
 * Retorna o estado de todos os breakpoints e o tamanho atual ativo.
 */
export function useBreakpoints() {
  const isSm = useBreakpoint("sm")
  const isMd = useBreakpoint("md")
  const isLg = useBreakpoint("lg")
  const isXl = useBreakpoint("xl")
  const is2xl = useBreakpoint("2xl")

  const current: Breakpoint | "xs" = is2xl
    ? "2xl"
    : isXl
      ? "xl"
      : isLg
        ? "lg"
        : isMd
          ? "md"
          : isSm
            ? "sm"
            : "xs"

  return {
    isMobile: !isMd, // < 768px
    isSm,            // >= 640px
    isMd,            // >= 768px
    isLg,            // >= 1024px
    isXl,            // >= 1280px
    is2xl,           // >= 1536px
    current,
  }
}