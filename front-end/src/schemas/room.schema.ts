import z from "zod"
import { paginationQueryParamsSchema } from "./api.schema"

export const roomTypeSchema = z.enum(["CLASSROOM", "LAB", "MEETING_ROOM", "AUDITORIUM"])

export const getRoomsQueryParamsSchema = paginationQueryParamsSchema.extend({
  name: z.string().optional(),
  buildingId: z.string().optional(),
  floorId: z.string().optional()
})

export const createRoomSchema = z.object({
    name: z.string(),
    type: roomTypeSchema,
    capacity: z.int(),
    floorId: z.uuid(),
})
