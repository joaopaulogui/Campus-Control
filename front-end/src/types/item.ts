import type z from "zod";
import type { createItemSchema, getItemsQueryParamsSchema, itemTypeSchema } from "@/schemas/item.schema";

export type ItemType = z.infer<typeof itemTypeSchema>

export type Item = {
    id: string
    name: string
    type: ItemType
    totalQuantity: number
    availableQuantity: number
    onHoldQuantity: number
}

export type GetItemsQueryParamsSchema = z.infer<typeof getItemsQueryParamsSchema>

export type CreateItemDTO = z.infer<typeof createItemSchema>