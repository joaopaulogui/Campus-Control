import { Item, ItemType } from "../entities/item.js";
import type { PaginationParams } from "../entities/value-objects/pagination-params.js";

export interface ItemFilter {
    name?: string | undefined,
    type?: ItemType | undefined,
}

export interface ItemsRepository {
    create(item: Item): Promise<void>
    findById(id: string): Promise<Item | null>
    findMany(filters?: ItemFilter): Promise<Item[]>
    findManyPaginated(filters?: ItemFilter, params?: PaginationParams): Promise<Item[]>
    save(item: Item): Promise<void>
    delete(item: Item): Promise<void>
}