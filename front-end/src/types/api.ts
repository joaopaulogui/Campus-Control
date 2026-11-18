import type { paginationQueryParamsSchema } from "@/schemas/api.schema"
import type z from "zod"

export type PaginationQueryParams = z.infer<typeof paginationQueryParamsSchema>

export type SelectQueryParams = {
  name?: string,
  page?: number,
  perPage?: number
}

export type SelectResponse = {
  id: string,
  name: string
}