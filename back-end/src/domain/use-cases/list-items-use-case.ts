import type { Item, ItemType } from "../entities/item"
import type { ItemsRepository } from "../repositories/items-repository"

interface ListItemsUseCaseRequest {
    name?: string | undefined
    type?: ItemType | undefined
    page?: number | undefined
    perPage?: number | undefined
}

interface ListItemsUseCaseResponse {
    items: Item[]
}

export class ListItemsUseCase {
    constructor(private itemsRepository: ItemsRepository) {}

    async execute({ name, type, page, perPage }: ListItemsUseCaseRequest): Promise<ListItemsUseCaseResponse> {
        if(!page) { page = 1 }

        if(!perPage) { perPage = 30 }

        const items = await this.itemsRepository.findManyPaginated({ name, type }, { page, perPage })
        
        return {
            items,
        }
    }
}