import type { createFloorSchema, floorFormSchema, getFloorsQueryParamsSchema } from "@/schemas/floor.schema";
import type { SelectQueryParams } from "./api";
import z from "zod";

export type Floor = {
  id: string
  name: string
  buildingId?: string
  buildingName?: string
}

export type GetFloorsQueryParamsSchema = z.infer<typeof getFloorsQueryParamsSchema>

export type FloorFormInput = z.input<typeof floorFormSchema>
export type FloorFormData = z.output<typeof floorFormSchema>

export type CreateFloorDTO = z.infer<typeof createFloorSchema>

export type UpdateFloorDTO = Partial<CreateFloorDTO>

export type FloorSelectQueryParams = SelectQueryParams & {
  buildingId?: string
}
