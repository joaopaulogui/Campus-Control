import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

export default function NotFound() {
    return (
        <div className="h-screen flex flex-col items-center justify-center gap-4 w-screen">
            <h1 className="text-6xl font-bold">404</h1>
            <p>Página não encontrada</p>

            <Button>
                <Link
                    to="/"
                >
                    Voltar para o início
                </Link>
            </Button>
        </div>
    )
}