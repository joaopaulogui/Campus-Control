import type { Item, ItemType } from "../entities/item"
import type { ItemsRepository } from "../repositories/items-repository"

interface ListItemsUseCaseRequest {
    name?: string | undefined
    type?: ItemType | undefined
}

interface ListItemsUseCaseResponse {
    items: Item[]
}

export class ListItemsUseCase {
    constructor(private itemsRepository: ItemsRepository) {}

    async execute({ name, type }: ListItemsUseCaseRequest): Promise<ListItemsUseCaseResponse> {
        const items = await this.itemsRepository.findMany({ name, type })
        
        return {
            items,
        }
    }
}