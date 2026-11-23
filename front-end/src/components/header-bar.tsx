import { NavLink } from "react-router-dom"
import { Building2 } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { cn } from "cn"
import { getAuthorizedNavItems } from "@/config/navigation"
import ProfileDropdown from "./profile-dropdown"
import { useAuth } from "@/hooks/use-auth"

export function HeaderBar() {
  const { user } = useAuth()
  const authorizedItems = getAuthorizedNavItems(user?.role)


  return (
    <header className="w-full px-4 pt-4">
      <div className="flex h-16 w-full items-center justify-between rounded-full border border-navy-border bg-navy px-4 text-navy-foreground shadow-2xl">
        {/* Esquerda: Logo + Navegação */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2.5 pl-1">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Building2 className="h-4 w-4" />
            </div>
            <span className="text-sm font-semibold tracking-tight">
              Campus Control
            </span>
          </div>

          <Separator
            orientation="vertical"
            className="hidden h-6 bg-navy-border md:block"
          />

          <nav className="hidden items-center gap-1 md:flex">
            {authorizedItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-navy-muted hover:bg-navy-accent hover:text-navy-foreground"
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Direita: Tema, Notificações e Perfil */}
        <div className="flex items-center gap-1.5">
          <ProfileDropdown />
        </div>
      </div>
    </header>
  )
}