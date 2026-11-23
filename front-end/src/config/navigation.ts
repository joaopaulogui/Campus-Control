import { DoorClosed, History, House, Package, Users, Wind } from "lucide-react"
import type { NavItem } from "@/types/navigation"
import type { UserRole } from "@/types/user"

export const NAV_ITEMS: NavItem[] = [
  {
    label: "Dashboard",
    to: "/dashboard",
    icon: House,
    allowedRoles: ["ADMIN", "MEMBER"],
  },
  {
    label: "Usuários",
    to: "/usuarios",
    icon: Users,
    allowedRoles: ["ADMIN"],
  },
  {
    label: "Blocos",
    to: "/blocos",
    icon: DoorClosed,
    allowedRoles: ["ADMIN"],
  },
  {
    label: "Andares",
    to: "/andares",
    icon: DoorClosed,
    allowedRoles: ["ADMIN"],
  },
  {
    label: "Salas",
    to: "/salas",
    icon: DoorClosed,
    allowedRoles: ["ADMIN", "MEMBER"],
  },
  {
    label: "Itens",
    to: "/itens",
    icon: Wind,
    allowedRoles: ["ADMIN", "MEMBER"],
  },
  {
    label: "Empréstimos",
    to: "/emprestimos",
    icon: Package,
    allowedRoles: ["ADMIN", "MEMBER"],
  },
  {
    label: "Auditoria",
    to: "/auditoria",
    icon: History,
    allowedRoles: ["ADMIN"],
  },
]


export function getAuthorizedNavItems(role?: string): NavItem[] {
  if (!role) return []
  return NAV_ITEMS.filter((item) =>
    item.allowedRoles.includes(role as UserRole)
  )
}