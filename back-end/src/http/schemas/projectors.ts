import { z } from "zod";
import { ProjectorStatus } from "../../entities/projector";

export const registerProjectorBodySchema = z.object({
    roomId: z.uuid(),
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