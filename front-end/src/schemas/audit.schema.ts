import z from "zod"
import { paginationQueryParamsSchema } from "./api.schema"

export const eventEntityTypeSchema = z.enum(["BUILDING", "FLOOR", "ROOM", "AIR_CONDITIONER, PROJECTOR, SCHEDULE, ITEM, LOAN, USER"])

export const getAuditsQueryParamsSchema = paginationQueryParamsSchema.extend({
  userId: z.string().optional(),
  eventType: z.string().optional(),
  eventEntity: eventEntityTypeSchema.optional(),
  entityId: z.string().optional(),
  description: z.string().optional()
})
