import z from "zod";
import type { buildingFormSchema, createBuildingSchema, getBuildingsQueryParamsSchema } from "@/schemas/building.schema";

export type Building = {
  id: string
  name: string
}

export type GetBuildingsQueryParamsSchema = z.infer<typeof getBuildingsQueryParamsSchema>

export type BuildingFormInput = z.input<typeof buildingFormSchema>
export type BuildingFormData = z.output<typeof buildingFormSchema>

export type CreateBuildingDTO = z.infer<typeof createBuildingSchema>

export type UpdateBuildingDTO = Partial<CreateBuildingDTO>