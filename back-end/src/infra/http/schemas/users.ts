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
    buildingIds: z.array(z.string()).optional()
})

export const updateUserParamsSchema = z.object({
    userId: z.uuid()
})

export const updateUserBodySchema = z.object({
    name: z.string().optional(),
    email: z.email().optional(),
    password: z.string().optional(),
    role: z.enum(UserRole).optional(),
    buildingIds: z.array(z.string()).optional()
})

export const getUserProfileResponseSchema = z.object({
    id: z.uuid(),
    name: z.string(),
    email: z.email(),
    role: z.enum(UserRole),
    buildings: z.array(z.object({
        id: z.uuid(),
        name: z.string()
    }))
})