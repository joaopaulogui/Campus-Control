import { createBrowserRouter } from "react-router-dom"
import { ProtectedRoute } from "@/components/protected-route"
import { USER_ROLES } from "@/types/user"
import LayoutPage from "@/components/layout-page"
import Login from "@/pages/login"
import Dashboard from "@/pages/dashboard"
import Buildings from "@/pages/buildings"
import Floors from "@/pages/floors"
import Rooms from "@/pages/rooms"
import Items from "@/pages/items"
import Loans from "@/pages/loans"
import Users from "@/pages/users"
import Audits from "@/pages/audits"
import NotAuthorized from "@/pages/not-authorized"
import NotFound from "@/pages/not-found"

export const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login />
    },
    {
        // Qualquer usuário autenticado (ADMIN ou MEMBER)
        element: <ProtectedRoute />,
        children: [
            {
                path: "/",
                element: <LayoutPage />,
                children: [
                    {
                        path: "dashboard",
                        element: <Dashboard />
                    },
                    {
                        path: "salas",
                        element: <Rooms />
                    },
                    {
                        path: "itens",
                        element: <Items />
                    },
                    {
                        path: "emprestimos",
                        element: <Loans />
                    },
                    {
                        // Sub-rotas exclusivas para ADMIN dentro do mesmo LayoutPage
                        element: <ProtectedRoute allowedRoles={[USER_ROLES.ADMIN]} />,
                        children: [
                            {
                                path: "blocos",
                                element: <Buildings />
                            },
                            {
                                path: "andares",
                                element: <Floors />
                            },
                            {
                                path: "usuarios",
                                element: <Users />
                            },
                            {
                                path: "auditoria",
                                element: <Audits />
                            },
                        ]
                    }
                ]
            }
        ]
    },
    {
        path: "/403",
        element: <NotAuthorized />
    },
    {
        path: "*",
        element: <NotFound />
    }
])