import { NavLink } from "react-router-dom"
import { Building2, ChevronDown, LogOut, Settings, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "cn"
import { useAuth } from "@/hooks/use-auth"
import { getAuthorizedNavItems } from "@/config/navigation"

export function HeaderBar() {
  const { user } = useAuth()
  const authorizedItems = getAuthorizedNavItems("ADMIN")

  return (
    <header className="w-full px-4 pt-4">
      <div className="flex h-16 w-full items-center justify-between rounded-full border border-navy-border bg-navy px-4 text-navy-foreground shadow-lg">
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
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button
                variant="ghost"
                className="flex h-auto items-center gap-2.5 rounded-full py-1.5 pr-3 pl-1.5 text-navy-foreground hover:bg-navy-accent hover:text-navy-foreground"
              >
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>

                <div className="hidden flex-col items-start text-left sm:flex">
                  <span className="text-xs font-medium leading-none">
                    {user?.name}
                  </span>
                  <span className="mt-1 text-[11px] leading-none text-navy-muted">
                    {user?.role}
                  </span>
                </div>

                <ChevronDown className="h-3.5 w-3.5 text-navy-muted" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-52">
              <DropdownMenuGroup>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user?.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user?.role}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  Perfil
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Configurações
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive focus:text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  Sair
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}