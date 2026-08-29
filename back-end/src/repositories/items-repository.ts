import { Item } from "../entities/item.js";

export interface ItemsRepository {
    create(item: Item): Promise<void>
    findById(id: string): Promise<Item | null>
    findByName(name: string): Promise<Item | null> 
    save(item: Item): Promise<void>
    delete(item: Item): Promise<void>
}