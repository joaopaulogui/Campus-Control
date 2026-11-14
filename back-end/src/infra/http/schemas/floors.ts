import { z } from "zod"

export const registerFloorBodySchema = z.object({
    name: z.string(),
    buildingId: z.uuid(),
})

export const listFloorsQuerySchema = z.object({
    buildingId: z.uuid(),
    name: z.string().optional(),
    page: z.coerce.number().int().positive().optional(),
    perPage: z.coerce.number().int().positive().optional()
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
})

export const listFloorsResponseSchema = z.array(floorResponseSchema)

export const selectFloorsResponseSchema = z.object({
    id: z.uuid(),
    name: z.string(),
})