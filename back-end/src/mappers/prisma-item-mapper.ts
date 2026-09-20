import { Item, ItemType as DomainItemType } from "../entities/item";
import { Prisma, type Item as PrismaItem, ItemType as PrismaItemType } from "../generated/prisma/client";

export class PrismaItemMapper {
    static toDomain(raw: PrismaItem): Item {
        const mappedType = DomainItemType[raw.type as keyof typeof DomainItemType]
        
        return new Item({
            name: raw.name,
            type: mappedType,
            totalQuantity: raw.totalQuantity,
            availableQuantity: raw.availableQuantity,
            onHoldQuantity: raw.onHoldQuantity,
            updatedAt: raw.updatedAt
        }, raw.id)
    }
    
    static toPrisma(item: Item): Prisma.ItemUncheckedCreateInput {
        const mappedType = PrismaItemType[item.type as keyof typeof PrismaItemType]
        
        return {
            id: item.id,
            name: item.name,
            type: mappedType,
            totalQuantity: item.totalQuantity,
            availableQuantity: item.availableQuantity,
            onHoldQuantity: item.onHoldQuantity,
            updatedAt: item.updatedAt ?? null
        }
    }
}