import { Item, ItemType } from "../entities/item.js";

export interface ItemFilter {
    name?: string | undefined,
    type?: ItemType | undefined,
}

export interface ItemsRepository {
    create(item: Item): Promise<void>
    findById(id: string): Promise<Item | null>
    findMany(filters?: ItemFilter): Promise<Item[]>
    save(item: Item): Promise<void>
    delete(item: Item): Promise<void>
}