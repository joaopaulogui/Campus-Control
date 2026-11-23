import z from "zod"
import { paginationQueryParamsSchema } from "./api.schema"

export const loanTypeSchema = z.enum(["IN_USE", "LATE", "RETURNED"])

export const getLoansQueryParamsSchema = paginationQueryParamsSchema.extend({
  responsibleName: z.string().optional(),
  itemName: z.string().optional(),
  status: loanTypeSchema.optional(),
})

export const createLoanSchema = z.object({
  responsibleName: z.string().min(1, "Nome do responsável é obrigatório"),
  responsibleRegistration: z.string().min(1, "Matrícula é obrigatória"),
  itemId: z.string().min(1, "Selecione um item"),
  quantity: z.number().int().positive().default(1),
  deadline: z.string().min(1, "Data de devolução prevista é obrigatória"),
})

export const loanFormSchema = z.object({
  item: z
    .object(
      {
        label: z.string(),
        value: z.string(),
      },
      { message: "Selecione o item" }
    )
    .refine((option) => !!option && !!option.value, "Selecione o item"),
  responsibleName: z.string().min(1, "O nome do responsável é obrigatório"),
  responsibleRegistration: z.string().min(1, "A matrícula é obrigatória"),
  deadline: z.string().min(1, "A data de devolução prevista é obrigatória"),
  quantity: z.number().int().min(1, "A quantidade deve ser no mínimo 1").default(1),
})


