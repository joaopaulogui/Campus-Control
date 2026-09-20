import { z } from "zod"
import { ItemType } from "../../entities/item"

export const RegisterItemBodySchema = z.object({
    name: z.string(),
    type: z.enum(ItemType),
    totalQuantity: z.int()
})