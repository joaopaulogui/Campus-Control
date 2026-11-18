import type z from "zod";
import type { createRoomSchema, getRoomsQueryParamsSchema, roomTypeSchema } from "@/schemas/room.schema";
import type { equipmentStatusSchema } from "@/schemas/equipment.schema";
import type { AirConditioner, Projector } from "./equipment";
import type { SelectQueryParams } from "./api";

export type RoomType = z.infer<typeof roomTypeSchema>

export type EquipmentStatus = z.infer<typeof equipmentStatusSchema>

export type Room = {
    id: string
    name: string
    type: RoomType
    capacity: number
    isLocked: boolean
}

export type RoomDetails = Room & {
    airConditioners: AirConditioner[],
    projectors: Projector[]
}

export type GetRoomsQueryParamsSchema = z.infer<typeof getRoomsQueryParamsSchema>

export type CreateRoomDTO = z.infer<typeof createRoomSchema>

export type UpdateRoomDTO = CreateRoomDTO

export type RoomSelectQueryParams = SelectQueryParams & {
  buildingId: string
  floorId: string
  type: RoomType
  isLocked: boolean
}