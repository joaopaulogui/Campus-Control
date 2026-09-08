import { z } from "zod"
import { UserRole } from "../../entities/user"

export const authenticateUserBodySchema = z.object({
    email: z.email(),
    password: z.string(),
})

export const authenticateUserResponseSchema = z.object({
    accessToken: z.string(),
})

export const createUserBodySchema = z.object({
    name: z.string(),
    email: z.email(),
    password: z.string(),
    role: z.enum(UserRole),
})
