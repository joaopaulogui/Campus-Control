import { z } from "zod";
import { ProjectorStatus } from "@domain/entities/projector";

export const registerProjectorBodySchema = z.object({
    roomId: z.uuid(),
})

export const listProjectorsQuerySchema = z.object({
    buildingId: z.uuid().optional(),
    floorId: z.uuid().optional(),
    roomId: z.uuid().optional(),
    status: z.enum(ProjectorStatus).optional(),
})

export const updateProjectorStatusParamsSchema = z.object({
    projectorId: z.uuid()
})

export const updateProjectorStatusBodySchema = z.object({
    status: z.enum(ProjectorStatus)
})

export const deleteProjectorParamsSchema = z.object({
    projectorId: z.uuid(),
})

export const projectorResponseSchema = z.object({
    id: z.uuid(),
    status: z.enum(ProjectorStatus),
    roomId: z.uuid()
})

export const listProjectorsResponseSchema = z.array(projectorResponseSchema)