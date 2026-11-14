import { useAuth } from "@/hooks/use-auth"
import type { UserRole } from "@/types/user"

type CanAccessProps = {
    allowedRoles: UserRole[]
    children: React.ReactNode
    fallback?: React.ReactNode
}

export function CanAccess({ allowedRoles, children, fallback = null }: CanAccessProps) {
    const { user } = useAuth()

    if (!user || !allowedRoles.includes(user.role)) {
        return <>{fallback}</>
    }

    return <>{children}</>
}