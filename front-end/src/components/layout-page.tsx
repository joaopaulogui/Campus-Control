import { AppSidebar } from "@/components/app-sidebar"
import { HeaderBar } from "@/components/header-bar"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { useBreakpoints } from "@/hooks/use-breakpoint"
import { Outlet } from "react-router-dom"

export default function LayoutPage() {

  const { isMobile } = useBreakpoints()

  return (
    <SidebarProvider defaultOpen={false}>
      {isMobile ? <AppSidebar /> : <></>}
      <SidebarInset className="min-w-0 bg-background">
        {isMobile ? <SidebarTrigger className="ml-4 mt-4 md:hidden" /> : <HeaderBar />}

        <main className="flex flex-1 flex-col gap-6 p-6 w-full">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}