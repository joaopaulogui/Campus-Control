import type z from "zod";
import type { createUserSchema, loginSchema, updateUserSchema, userRoleSchema } from "@/schemas/user.schema";
import type { Building } from "./building";

export const USER_ROLES = {
    ADMIN: "ADMIN",
    MEMBER: "MEMBER"
} as const

export type UserRole = z.infer<typeof userRoleSchema>

export type User = {
    id: string
    name: string
    email: string
    role: UserRole
    buildings?: Building[]
}

export type LoginDTO = z.infer<typeof loginSchema>

export type CreateUserDTO = z.infer<typeof createUserSchema>

export type UpdateUserDTO = z.infer<typeof updateUserSchema>

export type LoginResponse = {
    accessToken: string
}