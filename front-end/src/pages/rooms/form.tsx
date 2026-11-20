import { useEffect } from "react"
import { useForm, Controller, useWatch } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { BuildingSelect } from "@/components/select/building-select"
import { FloorSelect } from "@/components/select/floor-select"
import { room } from "@/services/room"
import { roomFormSchema } from "@/schemas/room.schema"
import type { RoomFormData, RoomFormInput } from "@/types/room"
import { RoomStatusSelect, roomStatusSelectOptions } from "@/components/select/room-status-select"
import { RoomTypeSelect, roomTypeSelectOptions } from "@/components/select/room-type-select"

type Props = {
  roomId?: string
  back?: () => void
}

export default function RoomForm({ roomId, back }: Props) {
  const queryClient = useQueryClient()

  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<RoomFormInput, unknown, RoomFormData>({
    resolver: zodResolver(roomFormSchema),
    defaultValues: {
      name: "",
      capacity: 40,
      buildingId: undefined,
      floorId: undefined,
      isLocked: {
        label: "Fechada",
        value: false
      },
      type: {
        label: "Sala de Aula",
        value: "CLASSROOM"
      }
    },
  })

  const watchBuilding = useWatch({ control, name: "buildingId" })

  const {
    data: roomData,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useQuery({
    queryKey: ["room_get_by_id", roomId],
    queryFn: () => room.getPerId(roomId || ""),
    enabled: !!roomId,
  })

  useEffect(() => {
    if (isLoading && !toast.isActive("room_id")) {
      toast.loading("Carregando...", { toastId: "room_id" })
    } else if (isError && error) {
      toast.update("room_id", {
        render: "Sala não encontrada",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      })
    } else if (isSuccess && roomData) {
      setValue("name", roomData.name)
      setValue("capacity", roomData.capacity)
      setValue("type", roomTypeSelectOptions.find(o => o.value === roomData.type) ?? roomTypeSelectOptions[0])
      setValue("isLocked", roomStatusSelectOptions.find(o => o.value === roomData.isLocked) ?? roomStatusSelectOptions[1])

      if (roomData.buildingId) {
        setValue("buildingId", {
          label: roomData.buildingName ?? "Bloco vinculado",
          value: roomData.buildingId,
        })
      }

      setTimeout(() => {
        if (roomData.floorId) {
          setValue("floorId", {
            label: roomData.floorName ?? "Andar vinculado",
            value: roomData.floorId,
          })
        }
      }, 200);

      toast.dismiss("room_id")
    }
  }, [isLoading, isError, isSuccess, roomData, error, setValue])

  const mutationAdd = useMutation({
    mutationFn: (data: RoomFormData) =>
      room.create({
        name: data.name,
        type: data.type,
        capacity: Number(data.capacity),
        floorId: data.floorId,
      }),
    onMutate() {
      toast.loading("Cadastrando sala...", { toastId: "add_room" })
    },
    onSuccess() {
      toast.update("add_room", {
        render: "Sala cadastrada com sucesso",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      })
      handleSuccess()
    },
    onError(err: unknown) {
      const errorObj = err as { response?: { data?: { message?: string } } }
      toast.update("add_room", {
        render: errorObj.response?.data?.message ?? "Erro ao cadastrar sala",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      })
    },
  })

  const mutationUpdate = useMutation({
    mutationFn: async (data: RoomFormData) => {
      await room.update(roomId!, {
        name: data.name,
        type: data.type,
        capacity: Number(data.capacity),
      })

      if (roomData && roomData.isLocked !== data.isLocked) {
        await room.toogleLock(roomId!)
      }
    },
    onMutate() {
      toast.loading("Atualizando sala...", { toastId: "update_room" })
    },
    onSuccess() {
      toast.update("update_room", {
        render: "Sala atualizada com sucesso",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      })
      handleSuccess()
    },
    onError(err: unknown) {
      const errorObj = err as { response?: { data?: { message?: string } } }
      toast.update("update_room", {
        render: errorObj.response?.data?.message ?? "Erro ao atualizar sala",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      })
    },
  })

  function submit(data: RoomFormData) {
    if (roomId) mutationUpdate.mutate(data)
    else mutationAdd.mutate(data)
  }

  function handleSuccess() {
    queryClient.invalidateQueries({ queryKey: ["rooms"] })
    if (back) back()
  }

  const isPending = mutationAdd.isPending || mutationUpdate.isPending

  return (
    <form
      autoComplete="off"
      onSubmit={handleSubmit(submit)}
      className="flex flex-col gap-4 text-left"
    >
      {/* Nome da sala */}
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="room-name" className="text-xs font-medium text-foreground">
          Nome
        </Label>
        <Input
          id="room-name"
          type="text"
          placeholder="Ex: Sala 13"
          className="h-10 rounded-xl bg-input/40"
          {...register("name")}
        />
        {errors.name ? (
          <span className="text-xs text-red-500">{errors.name.message}</span>
        ) : null}
      </div>

      {/* Bloco e Andar (2 colunas) */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
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

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="room-floor" className="text-xs font-medium text-foreground">
            Andar
          </Label>
          <Controller
            name="floorId"
            control={control}
            render={({ field: { value, onChange } }) => (
              <FloorSelect
                value={value}
                buildingId={watchBuilding?.value}
                onChange={onChange}
                placeholder="Selecione o andar"
                isClearable={false}
              />
            )}
          />
          {errors.floorId ? (
            <span className="text-xs text-red-500">{errors.floorId.message}</span>
          ) : null}
        </div>
      </div>

      {/* Capacidade e Status (2 colunas) */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="room-capacity" className="text-xs font-medium text-foreground">
            Capacidade
          </Label>
          <Input
            id="room-capacity"
            type="number"
            min={1}
            placeholder="40"
            className="h-10 rounded-xl bg-input/40"
            {...register("capacity", { valueAsNumber: true })}
          />
          {errors.capacity ? (
            <span className="text-xs text-red-500">{errors.capacity.message}</span>
          ) : null}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="room-status" className="text-xs font-medium text-foreground">
            Tipo
          </Label>
          <Controller
            name="type"
            control={control}
            render={({ field: { value, onChange, name } }) => (
              <RoomTypeSelect
                name={name}
                value={value}
                onChange={onChange}
                isClearable={false}
              />
            )}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="room-status" className="text-xs font-medium text-foreground">
            Status
          </Label>
          <Controller
            name="isLocked"
            control={control}
            render={({ field: { value, onChange, name } }) => (
              <RoomStatusSelect
                name={name}
                value={value}
                onChange={onChange}
                isClearable={false}
              />
            )}
          />
        </div>
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