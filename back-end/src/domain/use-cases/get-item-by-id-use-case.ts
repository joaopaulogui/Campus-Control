import type { Item } from "../entities/item"
import type { ItemsRepository } from "../repositories/items-repository"

interface GetItemByIdUseCaseRequest {
    itemId: string,
}

interface GetItemByIdUseCaseResponse {
    item: Item
}

export class GetItemByIdUseCase {
    constructor(private itemsRepository: ItemsRepository) {}

    async execute({ itemId }: GetItemByIdUseCaseRequest): Promise<GetItemByIdUseCaseResponse> {
        const item = await this.itemsRepository.findById(itemId)
        
        if(!item) {
            throw new Error()
        }

        return { item }
    }
}