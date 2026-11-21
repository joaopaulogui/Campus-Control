import z from "zod"
import { paginationQueryParamsSchema } from "./api.schema"

export const getFloorsQueryParamsSchema = paginationQueryParamsSchema.extend({
  name: z.string().optional(),
  buildingId: z.string().optional()
})

export const floorFormSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório"),
  buildingId: z.object({
    label: z.string(),
    value: z.string()
  }).transform(option => option.value).refine(value => value !== "", "O bloco é obrigatório")
})

export const createFloorSchema = z.object({
  name: z.string(),
  buildingId: z.string()
})