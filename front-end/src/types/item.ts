import type z from "zod";
import type { createItemSchema, getItemsQueryParamsSchema, itemFormSchema, itemTypeSchema } from "@/schemas/item.schema";
import type { SelectQueryParams } from "./api";

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

export type ItemFormInput = z.input<typeof itemFormSchema>
export type ItemFormData = z.output<typeof itemFormSchema>

export type CreateItemDTO = z.infer<typeof createItemSchema>

export type ItemSelectQueryParams = SelectQueryParams & {
  type?: ItemType
}
