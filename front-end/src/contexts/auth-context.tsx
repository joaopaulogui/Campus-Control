import React from "react"

export type User = {
    id_usuario: number
    usuario: string
    nome: string
    tipo_acesso: 'Administrador' | 'Bibliotecario' | 'Usuario'
}

export type AuthContextType = {
    user: User | null
    token: string | null
    setToken: (token: string | null) => void
}

export const AuthContext = React.createContext<AuthContextType>({} as AuthContextType)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user,] = React.useState<User | null>(null)
    const [token, setToken] = React.useState<string | null>(() => localStorage.getItem('token'))

    React.useEffect(() => {
        if (token) localStorage.setItem('token', token)
        else localStorage.removeItem('token')
    }, [token])

    return (
        <AuthContext.Provider value={{ user, token, setToken }}>
            {children}
        </AuthContext.Provider>
    )
}