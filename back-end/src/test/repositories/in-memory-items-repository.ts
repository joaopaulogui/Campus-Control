import type { Item } from "@domain/entities/item";
import type { PaginationParams } from "@core/repositories/pagination-params";
import type { ItemFilter, ItemsRepository } from "@domain/repositories/items-repository";

export class InMemoryItemsRepository implements ItemsRepository {
    public items: Item[] = []

    async create(item: Item): Promise<void> {
        this.items.push(item)
    }

    async findById(id: string): Promise<Item | null> {
        const item = this.items.find(item => item.id === id)

        if(!item) {
            return null
        }

        return item
    }

    async findMany(filters?: ItemFilter): Promise<Item[]> {
        const items = this.items.filter(i => {
            if(filters?.name && !i.name.includes(filters.name)) {
                return false
            }
            if(filters?.type && i.type !== filters.type) {
                return false
            }
            return true
        })

        return items
    }

    async findManyPaginated(filters?: ItemFilter, params: PaginationParams = { page: 1, perPage: 30 }): Promise<Item[]> {
        const items = this.items.filter(i => {
            if(filters?.name && !i.name.includes(filters.name)) {
                return false
            }
            if(filters?.type && i.type !== filters.type) {
                return false
            }
            return true
        }).splice((params.page - 1) * params.perPage, params.page * params.perPage)

        return items
    }

    async save(item: Item): Promise<void> {
        const itemIndex = this.items.findIndex(i => i.id === item.id)

        this.items[itemIndex] = item
    }
    
    async delete(item: Item): Promise<void> {
        const itemIndex = this.items.findIndex(i => i.id === item.id)
        
        this.items.splice(itemIndex, 1)
    }
}