import React from "react";
import { cn } from "cn";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ModeToggle } from "@/components/mode-toggle";
import { loginSchema as schema } from "@/schemas/user.schema"
import { toast } from "react-toastify"
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import type { LoginDTO } from "@/types/user";
import { useMutation } from "@tanstack/react-query";
import { user } from "@/services/user";
import { Button } from "@/components/ui/button";
import { BuildingComplex, Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Login() {

    const navigate = useNavigate()

    const { setToken } = useAuth()

    const { register, handleSubmit } = useForm({
        resolver: zodResolver(schema)
    })

    const [showPassword, setShowPassword] = React.useState(false)

    function submit(data: LoginDTO) {
        mutation.mutate(data)
    }

    const mutation = useMutation({
        mutationFn: (payload: LoginDTO) => user.login(payload),
        onMutate() {
            toast.loading("Carregando...", { toastId: "login" })
        },
        onSuccess(data) {
            toast.update("login", { render: "Seja bem vindo", isLoading: false, type: "success", autoClose: 2000 })
            setToken(data.accessToken)
            navigate("/")
        },
        onError(_error) {
            toast.update("login", { render: "Erro ao tentar fazer login", type: "error", isLoading: false, autoClose: 2000 })
        }
    })

    return (
        <div className="bg-secondary relative flex flex-col items-center justify-center gap-10 min-h-svh w-full">
            <div className="z-50 absolute top-2 right-2">
                <ModeToggle />
            </div>
            <div className="w-full h-1/3 md:h-auto flex flex-col items-center justify-end gap-1 text-center text-secondary-foreground">
                <div className="size-14 flex items-center justify-center rounded-xl mb-4 bg-primary">
                    <BuildingComplex />
                </div>
                <h1 className="text-2xl font-bold">Campus Control</h1>
                <p className="text-muted-foreground text-sm text-balance">
                    Sistema de Gestão de Campus
                </p>
            </div>
            <Card className="w-full h-2/3 md:h-auto md:w-1/2 xl:w-1/4 2xl:w-1/6">
                <CardHeader>
                    <CardTitle>Acessar o sistema</CardTitle>
                </CardHeader>
                <CardContent>
                    <form className={cn("flex flex-col gap-6")} onSubmit={handleSubmit(submit)}>
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="email">Email</FieldLabel>
                                <Input id="email" type="text" required {...register('email')} />
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="password">Senha</FieldLabel>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        required
                                        {...register("password")}
                                    />
                                    <Button
                                        type="button"
                                        size={"icon-sm"}
                                        variant={"ghost"}
                                        onClick={() => setShowPassword(prev => !prev)}
                                        className="z-50 absolute top-0.5 right-0.5"
                                    >
                                        {showPassword ?
                                            <EyeOff /> :
                                            <Eye />}
                                    </Button>
                                </div>
                            </Field>
                            <Field>
                                <Button type="submit">Fazer Login</Button>
                            </Field>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}