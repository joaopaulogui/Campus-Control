import { ChevronDown, ChevronUp, LogOut, User } from "lucide-react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { useAuth } from "@/hooks/use-auth";

export default function ProfileDropdown({ sidebar = false }) {

  const { user, logout } = useAuth()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button
          variant="ghost"
          className={`flex h-auto items-center ${sidebar ? "w-full justify-between" : "gap-2.5"} rounded-full py-1.5 pr-3 pl-1.5 text-navy-foreground hover:bg-navy-accent hover:text-navy-foreground`}
        >
          <div className={`flex gap-2.5 ${sidebar ? "items-center" : "justify-between"}`}>
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-primary text-primary-foreground">
                <User className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>

            <div className={`${sidebar ? "flex" : "hidden sm:flex"} flex-col items-start text-left`}>
              <span className="text-xs font-medium leading-none">
                {user?.name}
              </span>
              <span className="mt-1 text-[11px] leading-none text-navy-muted">
                {user?.role}
              </span>
            </div>
          </div>

          {sidebar ? <ChevronUp className="h-3.5 w-3.5 text-navy-muted" /> : <ChevronDown className="h-3.5 w-3.5 text-navy-muted" />}
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
          {/*<DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  Perfil
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Configurações
                </DropdownMenuItem>
                <DropdownMenuSeparator />*/}
          <DropdownMenuItem variant="destructive" onClick={() => logout()}>
            <LogOut className="mr-2 h-4 w-4" />
            Sair
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}