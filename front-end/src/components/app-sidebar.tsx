import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { BuildingComplex, House, Wind, DoorClosed, Package } from "lucide-react"
import { Link, useLocation, useNavigate } from "react-router-dom"

const menu = [
  {
    title: "Menu",
    icon: null,
    collapsed: true,
    items: [
      {
        title: "Dashboard",
        url: "/",
        icon: House,
        nivel_acesso: ["Administrador", "Funcionario"]
      },
      {
        title: "Ar-Condicionado",
        url: "/ar-condicionado",
        icon: Wind,
        nivel_acesso: ["Administrador", "Funcionario"]
      },
      {
        title: "Controle de Salas",
        url: "/controle-de-salas",
        icon: DoorClosed,
        nivel_acesso: ["Administrador", "Funcionario"]
      },
      {
        title: "Empréstimos",
        url: "/emprestimos",
        icon: Package,
        nivel_acesso: ["Administrador", "Funcionario"]
      },
    ]
  }
]

export function AppSidebar() {

  const navigate = useNavigate()
  //const { user, setUser, setToken } = useAuth()
  const { isMobile } = useSidebar()
  const { pathname } = useLocation()

  function isActive(url: string) {
    return url.split("/")[1] === pathname.split("/")[1]
  }

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex flex-row gap-3 items-center my-4 mx-2">
          <div className="h-12 w-12 shrink-0 rounded-md bg-sidebar-accent flex items-center justify-center">
            <BuildingComplex className="text-white h-7 w-7" />
          </div>
          <div>
            <p className="text-xl font-semibold text-sidebar-primary-foreground">Campus Control</p>
            <p className="text-xs text-sidebar-accent-foreground">Sistema Operacional</p>
          </div>
        </div>
      </SidebarHeader>
      <hr className="border border-sidebar-border" />
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className="gap-3 my-3">
            {menu.map((item) => (
              item.items?.map((subItem) => {
                const Icon = subItem.icon
                return (
                  //subItem.nivel_acesso.includes(user?.tipo_acesso || "") ? 
                  <SidebarMenuSubItem key={subItem.title}>
                    <SidebarMenuSubButton
                      className={`rounded-sm text-sidebar-accent-foreground hover:text-white hover:bg-sidebar-accent/70 p-6 mx-2 ${isActive(subItem.url) ? "text-white bg-sidebar-accent" : ""}`}>
                      <Link to={subItem.url} className="flex flex-row gap-2">
                        <Icon />
                        <span className="font-semibold text-[16px]">{subItem.title}</span>
                      </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  // : <></>
                )
              })
            ))
            }
          </SidebarMenu >
        </SidebarGroup >
      </SidebarContent >
      <SidebarFooter />
    </Sidebar >
  )
}