import type { Item } from "../../entities/item";
import type { ItemFilter, ItemsRepository } from "../../repositories/items-repository";

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
            return true
        })

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