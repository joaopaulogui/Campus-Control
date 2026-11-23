import z from "zod"

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string()
})

export const userRoleSchema = z.enum(["ADMIN", "MEMBER"])

export const createUserSchema = z.object({
    name: z.string().min(1, "O nome é obrigatório"),
    email: z.string().email("E-mail inválido"),
    password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
    role: userRoleSchema,
    buildingIds: z.array(z.string()).optional() 
})

export const updateUserSchema = z.object({
    name: z.string().optional(),
    email: z.string().email().optional(),
    password: z.string().optional(),
    role: userRoleSchema.optional(),
    buildingIds: z.array(z.string()).optional()
})

export const userFormSchema = z.object({
    name: z.string().min(1, "O nome é obrigatório"),
    email: z.string().email("E-mail inválido"),
    password: z.string().optional(),
    role: z.object(
        {
            label: z.string(),
            value: userRoleSchema,
        },
        { message: "Selecione o perfil de acesso" }
    ),
    buildings: z
        .array(
            z.object({
                label: z.string(),
                value: z.string(),
            })
        )
        .optional(),
})
