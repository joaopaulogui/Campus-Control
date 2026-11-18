import type z from "zod";
import type { equipmentStatusSchema, getEquipmentsQueryParamsSchema, registerEquipmentSchema, updateEquipmentStatusSchema } from "@/schemas/equipment.schema";

export type EquipmentStatus = z.infer<typeof equipmentStatusSchema>

export type AirConditioner = {
    id: string
    status: EquipmentStatus
    temperature: number
    isOn: boolean,
    roomId: string
}

export type Projector = {
    id: string
    status: EquipmentStatus
    roomId: string
}

export type GetEquipmentsQueryParamsSchema = z.infer<typeof getEquipmentsQueryParamsSchema>

export type GetAirConditionersResponse = AirConditioner[]

export type GetProjectorsResponse = Projector[]

export type RegisterEquipmentDTO = z.infer<typeof registerEquipmentSchema>

export type UpdateEquipmentStatusDTO = z.infer<typeof updateEquipmentStatusSchema>