import type z from "zod";
import type { createUserSchema, loginSchema, userRoleSchema } from "@/schemas/user.schema";

export const USER_ROLES = {
    ADMIN: "ADMIN",
    MEMBER: "MEMBER"
} as const

export type UserRole = z.infer<typeof userRoleSchema>

export type LoginDTO = z.infer<typeof loginSchema>

export type CreateUserDTO = z.infer<typeof createUserSchema>

export type LoginResponse = {
    accessToken: string
}

export type UserBuilding = {
    id: string
    name: string
}

export type User = {
    id: string
    name: string
    email: string
    role: UserRole
    buildings?: UserBuilding[]
}