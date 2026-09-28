import { z } from "zod"
import { RoomType } from "../../entities/room"

export const registerRoomBodySchema = z.object({
    name: z.string(),
    type: z.enum(RoomType),
    capacity: z.int(),
    floorId: z.uuid(),
})

export const listRoomsQuerySchema = z.object({
    buildingId: z.uuid(),
    floorId: z.uuid().optional(),
})

export const updateRoomParamsSchema = z.object({
    roomId: z.uuid()
})

export const updateRoomBodySchema = z.object({
    name: z.string().optional(),
    type: z.enum(RoomType).optional(),
    capacity: z.int().optional()
})

export const toggleRoomLockParamsSchema = z.object({
    roomId: z.uuid(),
})

export const deleteRoomParamsSchema = z.object({
    roomId: z.uuid()
})

export const roomResponseSchema = z.object({
    id: z.uuid(),
    name: z.string(),
    type: z.string(),
    capacity: z.number(),
    isLocked: z.boolean(),
})

export const listRoomsResponseSchema = z.array(roomResponseSchema)
