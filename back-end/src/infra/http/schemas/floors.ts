import { z } from "zod"

export const registerFloorBodySchema = z.object({
    name: z.string(),
    buildingId: z.uuid(),
})

export const listFloorsQuerySchema = z.object({
    buildingId: z.uuid().optional(),
    name: z.string().optional(),
    page: z.coerce.number().int().positive().optional(),
    perPage: z.coerce.number().int().nonnegative().optional()
})

export const updateFloorParamsSchema = z.object({
    floorId: z.uuid()
})

export const updateFloorBodySchema = z.object({
    name: z.string().optional()
})

export const deleteFloorParamsSchema = z.object({
    floorId: z.uuid()
})

export const floorResponseSchema = z.object({
    id: z.uuid(),
    name: z.string(),
    buildingId: z.uuid(),
    updatedAt: z.iso.datetime(),
})

export const floorWithBuildingResponseSchema = floorResponseSchema.extend({
    buildingName: z.string()
})

export const listFloorsResponseSchema = z.array(floorWithBuildingResponseSchema)

export const selectFloorsResponseSchema = z.object({
    id: z.uuid(),
    name: z.string(),
})