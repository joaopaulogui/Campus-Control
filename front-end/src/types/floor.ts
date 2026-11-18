import type { createFloorSchema, getFloorsQueryParamsSchema } from "@/schemas/floor.schema";
import z from "zod";

export type Floor = {
  id: string
  name: string
}

export type GetFloorsQueryParamsSchema = z.infer<typeof getFloorsQueryParamsSchema>

export type CreateFloorDTO = z.infer<typeof createFloorSchema>

export type UpdateFloorDTO = CreateFloorDTO