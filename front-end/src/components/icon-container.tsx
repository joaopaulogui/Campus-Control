import type { ReactNode } from "react"

type IconContainerProps = {
  icon: ReactNode,
  size?: string,
  colors?: string
}

export default function IconContainer({icon, size = "size-12", colors = "bg-primary/10 text-primary"} : IconContainerProps) {
  return (
    <div
      className={`flex ${size} shrink-0 items-center justify-center rounded-xl ${colors}`}
    >
      {icon}
    </div>
  )
}