import { z } from "zod"
import { LoanStatus } from "../../entities/loan"

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
    status: z.enum(LoanStatus).optional()
})

export const returnItemParamsSchema = z.object({
    loanId: z.uuid()
})

export const listLoansResponseSchema = z.array(z.object({
    id: z.uuid(),
    itemName: z.string(),
    itemId: z.uuid(),
    responsibleName: z.string(),
    responsibleRegistration: z.string(),
    quantity: z.int(),
    createdAt: z.iso.datetime(),
    returnedAt: z.iso.datetime(),
    deadline: z.iso.datetime(),
    status: z.enum(LoanStatus)
}))