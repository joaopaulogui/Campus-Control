import z from "zod";

export const paginationQueryParamsSchema = z.object({
  page: z.number().int().positive().optional(),
  perPage: z.number().int().positive().optional()
})