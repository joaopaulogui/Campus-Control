import { useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { user } from "@/services/user"
import { building } from "@/services/building"
import { userFormSchema } from "@/schemas/user.schema"
import type { UserFormData, UserFormInput } from "@/types/user"
import { UserRoleSelect } from "@/components/select/user-role-select"
import { BuildingsMultiSelect } from "@/components/select/buildings-multi-select"
import type { SelectOption } from "@/components/async-react-select"
import { invalidateUserRelatedQueries } from "@/config/query-keys"

type Props = {
  userId?: string
  back?: () => void
}

export default function UserForm({ userId, back }: Props) {
  const queryClient = useQueryClient()
  const [passwordError, setPasswordError] = useState<string | null>(null)

  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UserFormInput, unknown, UserFormData>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: { label: "Membro", value: "MEMBER" },
      buildings: [],
    },
  })

  // Carrega dados do usuário para edição
  const {
    data: userData,
    isLoading: isLoadingUser,
    isError,
    error,
    isSuccess,
  } = useQuery({
    queryKey: ["user_get_by_id", userId],
    queryFn: () => user.getById(userId || ""),
    enabled: !!userId,
  })

  // Preenche formulário quando dados do usuário carregam
  useEffect(() => {
    if (isLoadingUser && !toast.isActive("user_id")) {
      toast.loading("Carregando usuário...", { toastId: "user_id" })
    } else if (isError && error) {
      toast.update("user_id", {
        render: "Usuário não encontrado",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      })
    } else if (isSuccess && userData) {
      setValue("name", userData.name)
      setValue("email", userData.email)
      setValue("role", {
        label: userData.role === "ADMIN" ? "Administrador" : "Membro",
        value: userData.role,
      })

      if (userData.buildingIds && userData.buildingIds.length > 0) {
        building.getSelectList({}).then((buildingsList) => {
          const list = Array.isArray(buildingsList) ? buildingsList : []
          const selected = list
            .filter((b) => userData.buildingIds?.includes(b.id))
            .map((b) => ({ label: b.name, value: b.id }))
          setValue("buildings", selected)
        })
      }

      toast.dismiss("user_id")
    }
  }, [isLoadingUser, isError, isSuccess, userData, error, setValue])

  const mutationAdd = useMutation({
    mutationFn: (data: UserFormData) =>
      user.create({
        name: data.name,
        email: data.email,
        password: data.password!,
        role: data.role.value,
        buildingIds: data.buildings ? data.buildings.map((b) => b.value) : [],
      }),
    onMutate() {
      toast.loading("Cadastrando usuário...", { toastId: "user_mutation" })
    },
    onSuccess() {
      toast.update("user_mutation", {
        render: "Usuário cadastrado com sucesso",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      })
      handleSuccess()
    },
    onError(err: unknown) {
      const errorObj = err as { response?: { data?: { message?: string } } }
      toast.update("user_mutation", {
        render: errorObj.response?.data?.message ?? "Erro ao cadastrar usuário",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      })
    },
  })

  const mutationUpdate = useMutation({
    mutationFn: async (data: UserFormData) => {
      await user.update(userId!, {
        name: data.name,
        email: data.email,
        role: data.role.value,
        password: data.password && data.password.trim() !== "" ? data.password : undefined,
        buildingIds: data.buildings ? data.buildings.map((b) => b.value) : [],
      })
    },
    onMutate() {
      toast.loading("Atualizando usuário...", { toastId: "user_mutation" })
    },
    onSuccess() {
      toast.update("user_mutation", {
        render: "Usuário atualizado com sucesso",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      })
      handleSuccess()
    },
    onError(err: unknown) {
      const errorObj = err as { response?: { data?: { message?: string } } }
      toast.update("user_mutation", {
        render: errorObj.response?.data?.message ?? "Erro ao atualizar usuário",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      })
    },
  })

  function submit(data: UserFormData) {
    if (!userId) {
      if (!data.password || data.password.length < 6) {
        setPasswordError("A senha deve ter pelo menos 6 caracteres")
        return
      }
      setPasswordError(null)
      mutationAdd.mutate(data)
    } else {
      if (data.password && data.password.length > 0 && data.password.length < 6) {
        setPasswordError("A senha deve ter pelo menos 6 caracteres")
        return
      }
      setPasswordError(null)
      mutationUpdate.mutate(data)
    }
  }

  function handleSuccess() {
    invalidateUserRelatedQueries(queryClient)
    if (back) back()
  }

  const isPending = mutationAdd.isPending || mutationUpdate.isPending

  return (
    <form
      autoComplete="off"
      onSubmit={handleSubmit(submit)}
      className="flex flex-col gap-4 text-left"
    >
      {/* Nome */}
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="user-name" className="text-xs font-medium text-foreground">
          Nome
        </Label>
        <Input
          id="user-name"
          type="text"
          placeholder="Ex: Carlos Santos"
          className="h-10 rounded-xl bg-input/40"
          {...register("name")}
        />
        {errors.name ? (
          <span className="text-xs text-red-500">{errors.name.message}</span>
        ) : null}
      </div>

      {/* E-mail */}
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="user-email" className="text-xs font-medium text-foreground">
          E-mail
        </Label>
        <Input
          id="user-email"
          type="email"
          placeholder="Ex: carlos@campus.edu.br"
          className="h-10 rounded-xl bg-input/40"
          {...register("email")}
        />
        {errors.email ? (
          <span className="text-xs text-red-500">{errors.email.message}</span>
        ) : null}
      </div>

      {/* Perfil e Senha */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="user-role" className="text-xs font-medium text-foreground">
            Perfil de acesso
          </Label>
          <Controller
            name="role"
            control={control}
            render={({ field: { value, onChange, name } }) => (
              <UserRoleSelect
                name={name}
                value={value}
                onChange={onChange}
                isClearable={false}
              />
            )}
          />
          {errors.role ? (
            <span className="text-xs text-red-500">{errors.role.message}</span>
          ) : null}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="user-password" className="text-xs font-medium text-foreground">
            {userId ? "Nova senha (opcional)" : "Senha"}
          </Label>
          <Input
            id="user-password"
            type="password"
            placeholder={userId ? "Deixe em branco para manter" : "Mínimo 6 caracteres"}
            className="h-10 rounded-xl bg-input/40"
            {...register("password")}
          />
          {passwordError ? (
            <span className="text-xs text-red-500">{passwordError}</span>
          ) : null}
        </div>
      </div>

      {/* Blocos vinculados */}
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="user-buildings" className="text-xs font-medium text-foreground">
          Blocos vinculados
        </Label>
        <Controller
          name="buildings"
          control={control}
          render={({ field: { value, onChange, name } }) => (
            <BuildingsMultiSelect
              name={name}
              value={value as readonly SelectOption[]}
              onChange={(val) => onChange(val ? Array.from(val) : [])}
              placeholder="Selecione os blocos vinculados..."
            />
          )}
        />

      </div>

      {/* Botões de Ação */}
      <div className="flex items-center justify-end gap-3 pt-3">
        <Button
          type="button"
          variant="outline"
          onClick={back}
          className="flex-1 rounded-xl h-10 border-border/80 hover:bg-muted text-sm font-medium"
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          disabled={isPending}
          className="flex-1 rounded-xl h-10 bg-primary text-primary-foreground hover:bg-primary/90 text-sm font-medium shadow-sm"
        >
          {userId ? "Salvar alterações" : "Cadastrar"}
        </Button>
      </div>
    </form>
  )
}
