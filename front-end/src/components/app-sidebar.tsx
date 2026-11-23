import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Building2 } from "lucide-react"
import { Link, useLocation } from "react-router-dom"
import { cn } from "cn"
import { getAuthorizedNavItems } from "@/config/navigation"
import ProfileDropdown from "./profile-dropdown"
import { useAuth } from "@/hooks/use-auth"

export function AppSidebar() {
  const { pathname } = useLocation()
  const { user } = useAuth()
  const authorizedItems = getAuthorizedNavItems(user?.role)


  /*
  function isActive(url: string) {
    return url.split("/")[1] === pathname.split("/")[1]
  }
  */

  return (
    <Sidebar className="border-sidebar-border">
      <SidebarHeader>
        <div className="my-4 mx-2 flex flex-row items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sidebar-primary text-sidebar-primary-foreground">
            <Building2 className="h-6 w-6" />
          </div>
          <div>
            <p className="text-lg font-semibold leading-tight text-sidebar-foreground">
              Campus Control
            </p>
            <p className="text-xs text-navy-muted">Sistema Operacional</p>
          </div>
        </div>
      </SidebarHeader>

      <Separator className="bg-sidebar-border" />

      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className="my-3 gap-2">
            {authorizedItems.map((item) => {
              const Icon = item.icon
              const active = pathname.startsWith(item.to)

              return (
                <SidebarMenuSubItem key={item.to}>
                  <Link to={item.to} className={cn(
                    "mx-2 rounded-lg p-5 transition-colors flex flex-row items-center gap-3",
                    active
                      ? "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary hover:text-sidebar-primary-foreground"
                      : "text-navy-muted hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  )}>
                    <Icon className="h-4 w-4" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </Link>
                </SidebarMenuSubItem>
              )
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <ProfileDropdown sidebar />
      </SidebarFooter>
    </Sidebar>
  )
}