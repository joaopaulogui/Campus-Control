import React from "react"
import { cn } from "cn"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema as schema } from "@/schemas/user.schema"
import { toast } from "react-toastify"
import { Input } from "@/components/ui/input"
import { useNavigate } from "react-router-dom"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import type { LoginDTO } from "@/types/user"
import { useMutation } from "@tanstack/react-query"
import { user } from "@/services/user"
import { Button } from "@/components/ui/button"
import { Building2, Eye, EyeOff } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Index() {
  const navigate = useNavigate()
  const { setToken } = useAuth()
  const [showPassword, setShowPassword] = React.useState(false)

  const { register, handleSubmit } = useForm({
    resolver: zodResolver(schema),
  })

  function submit(data: LoginDTO) {
    mutation.mutate(data)
  }

  const mutation = useMutation({
    mutationFn: (payload: LoginDTO) => user.login(payload),
    onMutate() {
      toast.loading("Carregando...", { toastId: "login" })
    },
    onSuccess(data) {
      toast.update("login", {
        render: "Seja bem vindo",
        isLoading: false,
        type: "success",
        autoClose: 2000,
      })
      setToken(data.accessToken)
      navigate("/dashboard", { replace: true })
    },
    onError() {
      toast.update("login", {
        render: "Erro ao tentar fazer login",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      })
    },
  })

  return (
    <div className="bg-navy text-navy-foreground relative flex min-h-svh w-full flex-col items-center justify-center gap-8 p-4">
      <div className="flex flex-col items-center justify-end gap-1.5 text-center">
        <div className="mb-3 flex size-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-md">
          <Building2 className="size-7" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight">Campus Control</h1>
        <p className="text-sm text-navy-muted text-balance">
          Sistema de Gestão de Campus
        </p>
      </div>

      <Card className="w-full max-w-md rounded-2xl border-border/50 shadow-xl">
        <CardHeader>
          <CardTitle className="text-lg">Acessar o sistema</CardTitle>
        </CardHeader>
        <CardContent>
          <form className={cn("flex flex-col gap-5")} onSubmit={handleSubmit(submit)}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="text"
                  className="bg-muted"
                  required
                  {...register("email")}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="password">Senha</FieldLabel>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    className="bg-muted pr-10"
                    required
                    {...register("password")}
                  />
                  <Button
                    type="button"
                    size="icon-sm"
                    variant="ghost"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute top-1/2 right-1.5 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </Button>
                </div>
              </Field>
              <Field>
                <Button type="submit" className="w-full">
                  Entrar
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}