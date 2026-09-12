import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

export default function NotAuthorized() {
    return (
        <div className="h-screen flex flex-col items-center justify-center gap-4 w-screen">
            <h1 className="text-6xl font-bold">403 - Acesso Negado</h1>
            <p>Você não tem permissão para acessar esta página.</p>

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