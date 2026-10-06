import { z } from "zod"
import { ItemType } from "../../entities/item"

export const RegisterItemBodySchema = z.object({
    name: z.string(),
    type: z.enum(ItemType),
    totalQuantity: z.int()
})

export const listItemsQuerySchema = z.object({
    name: z.string().optional(),
    type: z.enum(ItemType).optional(),
})

export const deleteItemParamsSchema = z.object({
    itemId: z.uuid()
})

export const itemResponseSchema = z.object({
    id: z.uuid(),
    name: z.string(),
    type: z.enum(ItemType),
    totalQuantity: z.int(),
    availableQuantity: z.int(),
    onHoldQuantity: z.int()
})

export const listItemsResponseSchema = z.array(itemResponseSchema)