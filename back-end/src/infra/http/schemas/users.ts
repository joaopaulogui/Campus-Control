import { z } from "zod"
import { UserRole } from "@domain/entities/user"

export const authenticateUserBodySchema = z.object({
    email: z.email(),
    password: z.string(),
})

export const authenticateUserResponseSchema = z.object({
    accessToken: z.string(),
})

export const registerUserBodySchema = z.object({
    name: z.string(),
    email: z.email(),
    password: z.string(),
    role: z.enum(UserRole),
})

export const getUserProfileResponseSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.email(),
    role: z.enum(UserRole),
    buildings: z.array(z.object({
        id: z.string(),
        name: z.string()
    }))
})