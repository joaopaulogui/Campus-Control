import type z from "zod";
import type { createUserSchema, loginSchema, updateUserSchema, userFormSchema, userRoleSchema } from "@/schemas/user.schema";
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
    createdAt?: string
    updatedAt?: string | null
    deletedAt?: string | null
}

export type UserWithBuildingIds = User & {
    buildingIds?: string[]
}

export type GetUsersQueryParamsSchema = {
    name?: string
    email?: string
    role?: UserRole
}

export type LoginDTO = z.infer<typeof loginSchema>

export type CreateUserDTO = z.infer<typeof createUserSchema>

export type UpdateUserDTO = z.infer<typeof updateUserSchema>

export type UserFormInput = z.input<typeof userFormSchema>
export type UserFormData = z.output<typeof userFormSchema>

export type LoginResponse = {
    accessToken: string
}
