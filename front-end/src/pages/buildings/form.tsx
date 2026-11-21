import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { building } from "@/services/building"
import { buildingFormSchema } from "@/schemas/building.schema"
import type { BuildingFormData, BuildingFormInput } from "@/types/building"

type Props = {
  buildingId?: string
  back?: () => void
}

export default function BuildingForm({ buildingId, back }: Props) {
  const queryClient = useQueryClient()

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<BuildingFormInput, unknown, BuildingFormData>({
    resolver: zodResolver(buildingFormSchema),
    defaultValues: {
      name: ""
    },
  })

  const {
    data: buildingData,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useQuery({
    queryKey: ["building_get_by_id", buildingId],
    queryFn: () => building.getPerId(buildingId || ""),
    enabled: !!buildingId,
  })

  useEffect(() => {
    if (isLoading && !toast.isActive("building_id")) {
      toast.loading("Carregando...", { toastId: "building_id" })
    } else if (isError && error) {
      toast.update("building_id", {
        render: "Bloco não encontrado",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      })
    } else if (isSuccess && buildingData) {
      setValue("name", buildingData.name)

      toast.dismiss("building_id")
    }
  }, [isLoading, isError, isSuccess, buildingData, error, setValue])

  const mutationAdd = useMutation({
    mutationFn: (data: BuildingFormData) =>
      building.create({
        name: data.name
      }),
    onMutate() {
      toast.loading("Cadastrando bloco...", { toastId: "add_building" })
    },
    onSuccess() {
      toast.update("add_building", {
        render: "Bloco cadastrado com sucesso",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      })
      handleSuccess()
    },
    onError(err: unknown) {
      const errorObj = err as { response?: { data?: { message?: string } } }
      toast.update("add_building", {
        render: errorObj.response?.data?.message ?? "Erro ao cadastrar bloco",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      })
    },
  })

  const mutationUpdate = useMutation({
    mutationFn: async (data: BuildingFormData) => {
      await building.update(buildingId!, {
        name: data.name
      })
    },
    onMutate() {
      toast.loading("Atualizando bloco...", { toastId: "update_building" })
    },
    onSuccess() {
      toast.update("update_building", {
        render: "Bloco atualizado com sucesso",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      })
      handleSuccess()
    },
    onError(err: unknown) {
      const errorObj = err as { response?: { data?: { message?: string } } }
      toast.update("update_building", {
        render: errorObj.response?.data?.message ?? "Erro ao atualizar bloco",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      })
    },
  })

  function submit(data: BuildingFormData) {
    if (buildingId) mutationUpdate.mutate(data)
    else mutationAdd.mutate(data)
  }

  function handleSuccess() {
    queryClient.invalidateQueries({ queryKey: ["buildings"] })
    if (back) back()
  }

  const isPending = mutationAdd.isPending || mutationUpdate.isPending

  return (
    <form
      autoComplete="off"
      onSubmit={handleSubmit(submit)}
      className="flex flex-col gap-4 text-left"
    >
      {/* Nome da bloco */}
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="building-name" className="text-xs font-medium text-foreground">
          Nome
        </Label>
        <Input
          id="building-name"
          type="text"
          placeholder="Ex: Bloco 13"
          className="h-10 rounded-xl bg-input/40"
          {...register("name")}
        />
        {errors.name ? (
          <span className="text-xs text-red-500">{errors.name.message}</span>
        ) : null}
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
          Salvar
        </Button>
      </div>
    </form>
  )
}