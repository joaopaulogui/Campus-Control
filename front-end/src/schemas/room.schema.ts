import z from "zod"
import { paginationQueryParamsSchema } from "./api.schema"

export const roomTypeSchema = z.enum(["CLASSROOM", "LAB", "MEETING_ROOM", "AUDITORIUM"])

export const getRoomsQueryParamsSchema = paginationQueryParamsSchema.extend({
  name: z.string().optional(),
  buildingId: z.string().optional(),
  floorId: z.string().optional(),
  isLocked: z.boolean().optional(),
  type: roomTypeSchema.optional(),
})

export const roomFormSchema = z.object({
  name: z.string().min(1, "O nome da sala é obrigatório"),
  buildingId: z.object({
    label: z.string(),
    value: z.string()
  }).transform(option => option.value).refine(value => value !== "", "O bloco é obrigatório"),
  floorId: z.object({
    label: z.string(),
    value: z.string()
  }).transform(option => option.value).refine(value => value !== "", "O andar é obrigatório"),
  capacity: z.number().int().min(1, "A capacidade deve ser no mínimo 1"),
  isLocked: z.object({
    label: z.string(),
    value: z.boolean()
  }).transform(option => option.value),
  type: z.object({
    label: z.string(),
    value: roomTypeSchema
  }).transform(option => option.value),
})

export const createRoomSchema = z.object({
  name: z.string().min(1, "O nome da sala é obrigatório"),
  type: roomTypeSchema.default("CLASSROOM"),
  capacity: z.number().int().min(1, "A capacidade deve ser no mínimo 1"),
  floorId: z.string().min(1, "O andar é obrigatório"),
})
