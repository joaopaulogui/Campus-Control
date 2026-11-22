import z from "zod"
import { paginationQueryParamsSchema } from "./api.schema"

export const itemTypeSchema = z.enum(["EQUIPMENT", "STATIONARY", "OTHER"])

export const getItemsQueryParamsSchema = paginationQueryParamsSchema.extend({
  name: z.string().optional(),
  type: itemTypeSchema.optional()
})

export const itemFormSchema = z.object({
  name: z.string().min(1, "O nome da sala é obrigatório"),
  type: z.object({
    label: z.string(),
    value: itemTypeSchema
  }).transform(option => option.value),
  totalQuantity: z.number().int().min(1, "A quantidade deve ser no mínimo 1"),
})

export const createItemSchema = z.object({
  name: z.string(),
  type: itemTypeSchema,
  totalQuantity: z.int().positive(),
})
