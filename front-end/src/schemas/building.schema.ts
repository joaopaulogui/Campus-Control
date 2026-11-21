import z from "zod"
import { paginationQueryParamsSchema } from "./api.schema"

export const getBuildingsQueryParamsSchema = paginationQueryParamsSchema.extend({
    name: z.string().optional()
})

export const buildingFormSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório")
})

export const createBuildingSchema = z.object({
  name: z.string()
})