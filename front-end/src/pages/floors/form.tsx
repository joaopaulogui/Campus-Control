import { useEffect } from "react"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { floor } from "@/services/floor"
import { floorFormSchema } from "@/schemas/floor.schema"
import type { FloorFormData, FloorFormInput } from "@/types/floor"
import { BuildingSelect } from "@/components/select/building-select"

type Props = {
  floorId?: string
  back?: () => void
}

export default function FloorForm({ floorId, back }: Props) {
  const queryClient = useQueryClient()

  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FloorFormInput, unknown, FloorFormData>({
    resolver: zodResolver(floorFormSchema),
    defaultValues: {
      name: "",
      buildingId: undefined
    },
  })

  const {
    data: floorData,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useQuery({
    queryKey: ["floor_get_by_id", floorId],
    queryFn: () => floor.getPerId(floorId || ""),
    enabled: !!floorId,
  })

  useEffect(() => {
    if (isLoading && !toast.isActive("floor_id")) {
      toast.loading("Carregando...", { toastId: "floor_id" })
    } else if (isError && error) {
      toast.update("floor_id", {
        render: "Andar não encontrado",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      })
    } else if (isSuccess && floorData) {
      setValue("name", floorData.name)

      if (floorData.buildingId) {
        setValue("buildingId", {
          label: floorData.buildingName ?? "Bloco vinculado",
          value: floorData.buildingId,
        })
      }

      toast.dismiss("floor_id")
    }
  }, [isLoading, isError, isSuccess, floorData, error, setValue])

  const mutationAdd = useMutation({
    mutationFn: (data: FloorFormData) =>
      floor.create({
        name: data.name,
        buildingId: data.buildingId
      }),
    onMutate() {
      toast.loading("Cadastrando andar...", { toastId: "add_floor" })
    },
    onSuccess() {
      toast.update("add_floor", {
        render: "Andar cadastrado com sucesso",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      })
      handleSuccess()
    },
    onError(err: unknown) {
      const errorObj = err as { response?: { data?: { message?: string } } }
      toast.update("add_floor", {
        render: errorObj.response?.data?.message ?? "Erro ao cadastrar andar",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      })
    },
  })

  const mutationUpdate = useMutation({
    mutationFn: async (data: FloorFormData) => {
      await floor.update(floorId!, {
        name: data.name
      })
    },
    onMutate() {
      toast.loading("Atualizando andar...", { toastId: "update_floor" })
    },
    onSuccess() {
      toast.update("update_floor", {
        render: "Andar atualizado com sucesso",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      })
      handleSuccess()
    },
    onError(err: unknown) {
      const errorObj = err as { response?: { data?: { message?: string } } }
      toast.update("update_floor", {
        render: errorObj.response?.data?.message ?? "Erro ao atualizar andar",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      })
    },
  })

  function submit(data: FloorFormData) {
    if (floorId) mutationUpdate.mutate(data)
    else mutationAdd.mutate(data)
  }

  function handleSuccess() {
    queryClient.invalidateQueries({ queryKey: ["floors"] })
    if (back) back()
  }

  const isPending = mutationAdd.isPending || mutationUpdate.isPending

  return (
    <form
      autoComplete="off"
      onSubmit={handleSubmit(submit)}
      className="flex flex-col gap-4 text-left"
    >
      {/* Nome da andar */}
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="floor-name" className="text-xs font-medium text-foreground">
          Nome
        </Label>
        <Input
          id="floor-name"
          type="text"
          placeholder="Ex: Andar 13"
          className="h-10 rounded-xl bg-input/40"
          {...register("name")}
        />
        {errors.name ? (
          <span className="text-xs text-red-500">{errors.name.message}</span>
        ) : null}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="room-building" className="text-xs font-medium text-foreground">
          Bloco
        </Label>
        <Controller
          name="buildingId"
          control={control}
          render={({ field: { value, onChange } }) => (
            <BuildingSelect
              value={value}
              onChange={onChange}
              placeholder="Selecione o bloco"
              isClearable={false}
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
          Salvar
        </Button>
      </div>
    </form>
  )
}