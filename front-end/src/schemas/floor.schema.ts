import z from "zod"
import { paginationQueryParamsSchema } from "./api.schema"

export const getFloorsQueryParamsSchema = paginationQueryParamsSchema.extend({
  name: z.string().optional(),
  buildingId: z.string().optional()
})

export const createFloorSchema = z.object({
  name: z.string(),
  buildingId: z.string()
})