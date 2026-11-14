import { Loader2 } from "lucide-react"
import { cn } from "cn"

type PageLoaderProps = {
    message?: string
    fullScreen?: boolean
    className?: string
}

export function PageLoader({
    message = "Carregando...",
    fullScreen = true,
    className,
}: PageLoaderProps) {
    return (
        <div
            className={cn(
                "flex flex-col items-center justify-center gap-3 text-muted-foreground",
                fullScreen ? "min-h-svh w-full" : "h-full min-h-48 w-full",
                className
            )}
        >
            <Loader2 className="size-6 animate-spin text-primary" />
            {message && <span className="text-sm">{message}</span>}
        </div>
    )
}