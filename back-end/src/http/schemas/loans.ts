import { z } from "zod"

export const LoanItemBodySchema = z.object({
    responsibleName: z.string(),
    responsibleRegistration: z.string(),
    itemId: z.uuid(),
    quantity: z.int().min(1),
    deadline: z.iso.datetime(),
})