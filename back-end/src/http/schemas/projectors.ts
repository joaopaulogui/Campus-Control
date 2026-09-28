import { z } from "zod";

export const registerProjectorBodySchema = z.object({
    roomId: z.uuid(),
})

export const deleteProjectorParamsSchema = z.object({
    projectorId: z.uuid(),
})