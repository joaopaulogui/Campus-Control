import { Navigate, Outlet, useLocation } from "react-router-dom"
import { useAuth } from "@/hooks/use-auth"
import type { UserRole } from "@/types/user"
import { PageLoader } from "./page-loader"

type ProtectedRouteProps = {
    allowedRoles?: UserRole[]
}

export function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
    const { user, token, isLoadingUser } = useAuth()
    const location = useLocation()

    // 1. Existe token, mas a requisição /users/me ainda está em andamento
    if (token && isLoadingUser) {
        return <PageLoader />
    }

    // 2. Não tem token ou a busca do usuário falhou/retornou nulo
    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />
    }

    // 3. Logado, mas sem permissão para a rota (redireciona para sua página 403)
    if (allowedRoles && !allowedRoles.includes(user.role)) {
        return <Navigate to="/403" replace />
    }

    return <Outlet />
}