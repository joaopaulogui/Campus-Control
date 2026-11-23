import z from "zod"

export const equipmentStatusSchema = z.enum(["WORKING", "WARNING", "BROKEN"])

export const getEquipmentsQueryParamsSchema = z.object({
    buildingId: z.string().optional(),
    roomId: z.string().optional(),
    floorId: z.string().optional(),
    status: equipmentStatusSchema.optional()
})

export const registerEquipmentSchema = z.object({
    roomId: z.string()
})

export const updateEquipmentStatusSchema = z.object({
    status: equipmentStatusSchema
})
