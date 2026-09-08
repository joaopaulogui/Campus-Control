import { z } from "zod"

export const createBuildingBodySchema = z.object({
    name: z.string(),
})

export const buildingResponseSchema = z.object({
    id: z.uuid(),
    name: z.string(),
})

export const listBuildingsResponseSchema = z.array(buildingResponseSchema)
