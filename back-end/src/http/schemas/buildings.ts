import { z } from "zod"

export const registerBuildingBodySchema = z.object({
    name: z.string(),
})

export const listBuildingsQuerySchema = z.object({
    name: z.string().optional(),
    page: z.int().optional(),
    perPage: z.int().optional(),
})

export const updateBuildingParamsSchema = z.object({
    buildingId: z.uuid()
})

export const updateBuildingBodySchema = z.object({
    name: z.string().optional()
})

export const deleteBuildingParamsSchema = z.object({
    buildingId: z.uuid()
})

export const buildingResponseSchema = z.object({
    id: z.uuid(),
    name: z.string(),
})

export const selectBuildingResponseSchema = z.object({
    id: z.uuid(),
    name: z.string(),
})

export const listBuildingsResponseSchema = z.array(buildingResponseSchema)
