import type { ItemsRepository } from "../repositories/items-repository"

interface DeleteItemUseCaseRequest {
    itemId: string
}

interface DeleteItemUseCaseResponse {}

export class DeleteItemUseCase {
    constructor(private itemsRepository: ItemsRepository) {}

    async execute({ itemId }: DeleteItemUseCaseRequest): Promise<DeleteItemUseCaseResponse> {
        const item = await this.itemsRepository.findById(itemId)

        if(!item) {
            throw new Error()
        }

        item.totalQuantity = 0
        item.availableQuantity = 0
        item.onHoldQuantity = 0

        await this.itemsRepository.save(item)
    
        return {}
    }
}