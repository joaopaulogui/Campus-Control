import type { LucideIcon } from "lucide-react"
import type { UserRole } from "./user"

export interface NavItem {
  label: string
  to: string
  icon: LucideIcon
  allowedRoles: UserRole[]
}