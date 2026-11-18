import z from "zod"
import { paginationQueryParamsSchema } from "./api.schema"

export const loanTypeSchema = z.enum(["IN_USE", "LATE", "RETURNED"])

export const getLoansQueryParamsSchema = paginationQueryParamsSchema.extend({
  responsibleName: z.string().optional(),
  itemName: z.string().optional()
})

export const createLoanSchema = z.object({
  responsibleName: z.string(),
  responsibleRegistration: z.string(),
  itemId: z.string(),
  quantity: z.int().positive(),
  deadline: z.iso.datetime()
})
