import { z } from "zod"
import { AirConditionerStatus } from "../../entities/air-conditioner"

export const createAirConditionerBodySchema = z.object({
    roomId: z.uuid(),
})

export const listAirConditionersQuerySchema = z.object({
    floorId: z.uuid().optional(),
    status: z.enum(AirConditionerStatus).optional(),
})

export const toggleAirConditionerParamsSchema = z.object({
    airConditionerId: z.uuid(),
})

export const groupedAirConditionerResponseSchema = z.object({
    floorName: z.string(),
    rooms: z.array(z.object({
        name: z.string(),
        airConditioners: z.array(z.object({
            id: z.uuid(),
            status: z.enum(AirConditionerStatus),
            temperature: z.number(),
            isOn: z.boolean(),
        })),
    })),
})

export const listAirConditionersResponseSchema = z.array(groupedAirConditionerResponseSchema)
