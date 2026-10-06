import { z } from "zod"
import { RoomType } from "../../entities/room"
import { AirConditionerStatus } from "../../entities/air-conditioner"
import { ProjectorStatus } from "../../entities/projector"

export const registerRoomBodySchema = z.object({
    name: z.string(),
    type: z.enum(RoomType),
    capacity: z.int(),
    floorId: z.uuid(),
})

export const getRoomDetailsParamsSchema = z.object({
    roomId: z.uuid()
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

export const roomDetailsResponseSchema = roomResponseSchema.extend({
    airConditioners: z.array(z.object({
        id: z.uuid(),
        status: z.enum(AirConditionerStatus),
        temperature: z.number(),
        isOn: z.boolean()
    })),
    projectors: z.array(z.object({
        id: z.uuid(),
        status: z.enum(ProjectorStatus),
    }))
})