import { z } from "zod"

export const createFloorBodySchema = z.object({
    name: z.string(),
    buildingId: z.uuid(),
})

export const listFloorsQuerySchema = z.object({
    buildingId: z.uuid(),
})

export const floorResponseSchema = z.object({
    id: z.uuid(),
    name: z.string(),
})

export const listFloorsResponseSchema = z.array(floorResponseSchema)
