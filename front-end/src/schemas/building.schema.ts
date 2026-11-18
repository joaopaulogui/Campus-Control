import z from "zod"
import { paginationQueryParamsSchema } from "./api.schema"

export const getBuildingsQueryParamsSchema = paginationQueryParamsSchema.extend({
    name: z.string().optional()
})

export const createBuildingSchema = z.object({
  name: z.string()
})