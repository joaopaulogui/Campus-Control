import { AppSidebar } from "@/components/app-sidebar"
import { HeaderBar } from "@/components/header-bar"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Outlet } from "react-router-dom"

export default function LayoutPage() {
  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar />
      <SidebarInset className="min-w-0 bg-background">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="ml-4 mt-4 md:hidden" />
          <HeaderBar />
        </div>

        <main className="flex flex-1 flex-col gap-6 p-6 w-full max-w-7xl mx-auto">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}