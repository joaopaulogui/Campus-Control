import { createContext, useCallback, useState } from "react"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { user as userService } from "@/services/user"
import type { User } from "@/types/user"

export type AuthContextType = {
    user: User | null
    token: string | null
    isLoadingUser: boolean
    setToken: (token: string | null) => void
    logout: () => void
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const queryClient = useQueryClient()
    const [token, setTokenState] = useState<string | null>(() =>
        localStorage.getItem("token")
    )

    const setToken = useCallback((newToken: string | null) => {
        if (newToken) {
            localStorage.setItem("token", newToken)
        } else {
            localStorage.removeItem("token")
            queryClient.removeQueries({ queryKey: ["me"] })
        }
        setTokenState(newToken)
    }, [queryClient])

    const { data: user = null, isLoading: isLoadingUser } = useQuery({
        queryKey: ["me", token],
        queryFn: () => userService.getMe(),
        enabled: !!token,
        staleTime: 1000 * 60 * 5, // 5 minutos de cache
        retry: false,
    })

    const logout = useCallback(() => {
        setToken(null)
    }, [setToken])

    return (
        <AuthContext.Provider value={{ user, token, isLoadingUser, setToken, logout }}>
            {children}
        </AuthContext.Provider>
    )
}