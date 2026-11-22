import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { item } from "@/services/item"
import { itemFormSchema } from "@/schemas/item.schema"
import type { ItemFormData, ItemFormInput } from "@/types/item"
import { ItemTypeSelect, itemTypeSelectOptions } from "@/components/select/item-type-select"

type Props = {
  //itemId?: string
  back?: () => void
}

export default function ItemForm({ back }: Props) {
  const queryClient = useQueryClient()

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ItemFormInput, unknown, ItemFormData>({
    resolver: zodResolver(itemFormSchema),
    defaultValues: {
      name: "",
      totalQuantity: 1,
      type: itemTypeSelectOptions[0]
    },
  })

  /*
  const {
    data: itemData,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useQuery({
    queryKey: ["item_get_by_id", itemId],
    queryFn: () => item.getPerId(itemId || ""),
    enabled: !!itemId,
  })

  useEffect(() => {
    if (isLoading && !toast.isActive("item_id")) {
      toast.loading("Carregando...", { toastId: "item_id" })
    } else if (isError && error) {
      toast.update("item_id", {
        render: "Item não encontrado",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      })
    } else if (isSuccess && itemData) {
      setValue("name", itemData.name)

      toast.dismiss("item_id")
    }
  }, [isLoading, isError, isSuccess, itemData, error, setValue])
  */

  const mutationAdd = useMutation({
    mutationFn: (data: ItemFormData) =>
      item.create({
        name: data.name,
        type: data.type,
        totalQuantity: data.totalQuantity
      }),
    onMutate() {
      toast.loading("Cadastrando item...", { toastId: "add_item" })
    },
    onSuccess() {
      toast.update("add_item", {
        render: "Item cadastrado com sucesso",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      })
      handleSuccess()
    },
    onError(err: unknown) {
      const errorObj = err as { response?: { data?: { message?: string } } }
      toast.update("add_item", {
        render: errorObj.response?.data?.message ?? "Erro ao cadastrar item",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      })
    },
  })

  /*
  const mutationUpdate = useMutation({
    mutationFn: async (data: ItemFormData) => {
      await item.update(itemId!, {
        name: data.name
      })
    },
    onMutate() {
      toast.loading("Atualizando item...", { toastId: "update_item" })
    },
    onSuccess() {
      toast.update("update_item", {
        render: "Item atualizado com sucesso",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      })
      handleSuccess()
    },
    onError(err: unknown) {
      const errorObj = err as { response?: { data?: { message?: string } } }
      toast.update("update_item", {
        render: errorObj.response?.data?.message ?? "Erro ao atualizar item",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      })
    },
  })
  */

  function submit(data: ItemFormData) {
    //if (itemId) mutationUpdate.mutate(data)
    //else 
    mutationAdd.mutate(data)
  }

  function handleSuccess() {
    queryClient.invalidateQueries({ queryKey: ["items"] })
    if (back) back()
  }

  const isPending = mutationAdd.isPending /* || mutationUpdate.isPending */

  return (
    <form
      autoComplete="off"
      onSubmit={handleSubmit(submit)}
      className="flex flex-col gap-4 text-left"
    >
      {/* Nome da item */}
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="item-name" className="text-xs font-medium text-foreground">
          Nome
        </Label>
        <Input
          id="item-name"
          type="text"
          placeholder="Ex: Item 13"
          className="h-10 rounded-xl bg-input/40"
          {...register("name")}
        />
        {errors.name ? (
          <span className="text-xs text-red-500">{errors.name.message}</span>
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
            <ItemTypeSelect
              name={name}
              value={value}
              onChange={onChange}
              isClearable={false}
            />
          )}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="room-capacity" className="text-xs font-medium text-foreground">
          Quantidade
        </Label>
        <Input
          id="room-capacity"
          type="number"
          min={1}
          placeholder="40"
          className="h-10 rounded-xl bg-input/40"
          {...register("totalQuantity", { valueAsNumber: true })}
        />
        {errors.totalQuantity ? (
          <span className="text-xs text-red-500">{errors.totalQuantity.message}</span>
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