import z from "zod";
import type { createBuildingSchema, getBuildingsQueryParamsSchema } from "@/schemas/building.schema";

export type Building = {
  id: string
  name: string
}

export type GetBuildingsQueryParamsSchema = z.infer<typeof getBuildingsQueryParamsSchema>

export type CreateBuildingDTO = z.infer<typeof createBuildingSchema>

export type UpdateBuildingDTO = Partial<CreateBuildingDTO>