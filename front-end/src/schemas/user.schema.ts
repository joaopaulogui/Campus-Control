import z from "zod"

export const loginSchema = z.object({
    email: z.email(),
    password: z.string()
})

export const userRoleSchema = z.enum(["ADMIN", "MEMBER"])

export const createUserSchema = z.object({
    name: z.string(),
    email: z.email(),
    password: z.string(),
    role: userRoleSchema,
    buildingIds: z.array(z.string()) 
})

export const updateUserSchema = createUserSchema