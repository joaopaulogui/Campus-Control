import { z } from "zod"
import { LoanStatus } from "@domain/entities/loan"

export const LoanItemBodySchema = z.object({
    responsibleName: z.string(),
    responsibleRegistration: z.string(),
    itemId: z.uuid(),
    quantity: z.int().min(1),
    deadline: z.iso.datetime(),
})

export const listLoansQuerySchema = z.object({
    responsibleName: z.string().optional(),
    itemName: z.string().optional(),
    status: z.enum(LoanStatus).optional(),
    page: z.coerce.number().int().positive().optional(),
    perPage: z.coerce.number().int().nonnegative().optional(),
})

export const returnItemParamsSchema = z.object({
    loanId: z.uuid()
})

export const loanResponseSchema = z.object({
    id: z.uuid(),
    itemId: z.uuid(),
    responsibleName: z.string(),
    responsibleRegistration: z.string(),
    quantity: z.int(),
    createdAt: z.iso.datetime(),
    status: z.enum(LoanStatus),
    returnedAt: z.iso.datetime(),
    deadline: z.iso.datetime(),
})

export const loanWithItemResponseSchema = loanResponseSchema.extend({
    itemName: z.string()
})

export const listLoansResponseSchema = z.array(loanWithItemResponseSchema)

export const selectLoansResponseSchema = z.array(z.object({
    id: z.uuid(),
    label: z.string(),
}))