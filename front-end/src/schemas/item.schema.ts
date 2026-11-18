import z from "zod"
import { paginationQueryParamsSchema } from "./api.schema"

export const itemTypeSchema = z.enum(["EQUIPMENT", "STATIONARY", "OTHER"])

export const getItemsQueryParamsSchema = paginationQueryParamsSchema.extend({
  name: z.string().optional(),
  type: itemTypeSchema.optional()
})

export const createItemSchema = z.object({
  name: z.string(),
  type: itemTypeSchema,
  totalQuantity: z.int().positive(),
})
