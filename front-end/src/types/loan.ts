import type z from "zod";
import type { createLoanSchema, getLoansQueryParamsSchema, loanTypeSchema } from "@/schemas/loan.schema";

export type LoanType = z.infer<typeof loanTypeSchema>

export type Loan = {
    id: string,
    itemName: string,
    itemId: string,
    responsibleName: string,
    responsibleRegistration: string,
    quantity: number,
    createdAt: string,
    returnedAt: string,
    deadline: string,
    status: LoanType
}

export type GetLoansQueryParamsSchema = z.infer<typeof getLoansQueryParamsSchema>

export type CreateLoanDTO = z.infer<typeof createLoanSchema>