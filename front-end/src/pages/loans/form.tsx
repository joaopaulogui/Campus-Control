import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { loan } from "@/services/loan"
import { loanFormSchema } from "@/schemas/loan.schema"
import type { LoanFormData, LoanFormInput } from "@/types/loan"
import { ItemSelect } from "@/components/select/item-select"
import { invalidateLoanRelatedQueries } from "@/config/query-keys"

type Props = {
  back?: () => void
}

export default function LoanForm({ back }: Props) {
  const queryClient = useQueryClient()
  const today = new Date().toISOString().split("T")[0]

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoanFormInput, unknown, LoanFormData>({
    resolver: zodResolver(loanFormSchema),
    defaultValues: {
      responsibleName: "",
      responsibleRegistration: "",
      deadline: "",
      quantity: 1,
    },
  })

  const mutationAdd = useMutation({
    mutationFn: (data: LoanFormData) =>
      loan.create({
        responsibleName: data.responsibleName,
        responsibleRegistration: data.responsibleRegistration,
        itemId: data.item.value,
        quantity: data.quantity,
        deadline: new Date(`${data.deadline}T23:59:59`).toISOString(),
      }),
    onMutate() {
      toast.loading("Registrando empréstimo...", { toastId: "add_loan" })
    },
    onSuccess() {
      toast.update("add_loan", {
        render: "Empréstimo registrado com sucesso",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      })
      invalidateLoanRelatedQueries(queryClient)
      if (back) back()
    },
    onError(err: unknown) {
      const errorObj = err as { response?: { data?: { message?: string } } }
      toast.update("add_loan", {
        render: errorObj.response?.data?.message ?? "Erro ao registrar empréstimo",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      })
    },
  })

  function submit(data: LoanFormData) {
    mutationAdd.mutate(data)
  }

  const isPending = mutationAdd.isPending

  return (
    <form
      autoComplete="off"
      onSubmit={handleSubmit(submit)}
      className="flex flex-col gap-4 text-left"
    >
      {/* Item */}
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="loan-item" className="text-xs font-medium text-foreground">
          Item
        </Label>
        <Controller
          name="item"
          control={control}
          render={({ field: { value, onChange, name } }) => (
            <ItemSelect
              name={name}
              value={value}
              onChange={onChange}
              isClearable={false}
              placeholder="Selecione o item..."
            />
          )}
        />
        {errors.item ? (
          <span className="text-xs text-red-500">{errors.item.message}</span>
        ) : null}
      </div>

      {/* Responsável e Matrícula */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="responsible-name" className="text-xs font-medium text-foreground">
            Responsável
          </Label>
          <Input
            id="responsible-name"
            type="text"
            placeholder="Nome completo"
            className="h-10 rounded-xl bg-input/40"
            {...register("responsibleName")}
          />
          {errors.responsibleName ? (
            <span className="text-xs text-red-500">
              {errors.responsibleName.message}
            </span>
          ) : null}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="responsible-reg" className="text-xs font-medium text-foreground">
            Matrícula
          </Label>
          <Input
            id="responsible-reg"
            type="text"
            placeholder="Ex: 20210045"
            className="h-10 rounded-xl bg-input/40"
            {...register("responsibleRegistration")}
          />
          {errors.responsibleRegistration ? (
            <span className="text-xs text-red-500">
              {errors.responsibleRegistration.message}
            </span>
          ) : null}
        </div>
      </div>

      {/* Data empréstimo e Devolução prevista */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="loan-date" className="text-xs font-medium text-foreground">
            Data empréstimo
          </Label>
          <Input
            id="loan-date"
            type="date"
            disabled
            defaultValue={today}
            className="h-10 rounded-xl bg-input/20 text-muted-foreground"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="loan-deadline" className="text-xs font-medium text-foreground">
            Devolução prevista
          </Label>
          <Input
            id="loan-deadline"
            type="date"
            min={today}
            className="h-10 rounded-xl bg-input/40"
            {...register("deadline")}
          />
          {errors.deadline ? (
            <span className="text-xs text-red-500">
              {errors.deadline.message}
            </span>
          ) : null}
        </div>
      </div>

      {/* Quantidade e Observações */}
      <div className="grid grid-cols-1 gap-3">
        <div className="flex flex-col gap-1.5 sm:col-span-1">
          <Label htmlFor="loan-quantity" className="text-xs font-medium text-foreground">
            Quantidade
          </Label>
          <Input
            id="loan-quantity"
            type="number"
            min={1}
            defaultValue={1}
            className="h-10 rounded-xl bg-input/40"
            {...register("quantity", { valueAsNumber: true })}
          />
          {errors.quantity ? (
            <span className="text-xs text-red-500">
              {errors.quantity.message}
            </span>
          ) : null}
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
          Registrar
        </Button>
      </div>
    </form>
  )
}
