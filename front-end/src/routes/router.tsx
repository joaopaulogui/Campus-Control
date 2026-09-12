import Login from "@/pages/login"
import { createBrowserRouter } from "react-router-dom"
import Dashboard from "@/pages/dashboard"
import LayoutPage from "@/components/layout-page"
import NotAuthorized from "@/pages/not-authorized"
import NotFound from "@/pages/not-found"

export const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/",
        element: <LayoutPage />,
        children: [
            {
                path: "",
                element: <Dashboard />
            },
        ]
    },
    {
        path: "403",
        element: <NotAuthorized />
    },
    {
        path: "*",
        element: <NotFound />
    }
])