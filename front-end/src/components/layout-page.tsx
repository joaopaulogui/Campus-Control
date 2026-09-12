import { AppSidebar } from "@/components/app-sidebar"
import { Separator } from "@/components/ui/separator"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { ModeToggle } from "./mode-toggle"
import { Outlet } from "react-router-dom"

export default function LayoutPage() {

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset className="min-w-0">
                <header className="relative border-b border-sidebar-border flex h-[72px] shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />
                        <div className="absolute top-2 right-2">
                            <ModeToggle />
                        </div>
                    </div>
                </header>
                <main className="flex flex-1 flex-col gap-4 p-4 pt-0 w-full">
                    <Outlet />
                </main>
            </SidebarInset>
        </SidebarProvider>
    )
}