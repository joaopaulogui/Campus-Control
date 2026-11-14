import { z } from "zod"

export const unauthorizedResponseSchema = z.object({
    message: z.string(),
})

export const healthResponseSchema = z.object({
    ok: z.boolean(),
})
