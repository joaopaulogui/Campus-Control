import { Item, type ItemType } from "../entities/item"
import type { ItemsRepository } from "../repositories/items-repository"

interface RegisterItemUseCaseRequest {
    name: string
    type: ItemType
    totalQuantity: number
}

interface RegisterItemUseCaseResponse {}

export class RegisterItemUseCase {
    constructor(private itemsRepository: ItemsRepository) {}

    async execute({ name, type, totalQuantity }: RegisterItemUseCaseRequest): Promise<RegisterItemUseCaseResponse> {
        const item = new Item({
            name,
            type,
            totalQuantity,
            availableQuantity: totalQuantity,
            onHoldQuantity: 0,
        })

        await this.itemsRepository.create(item)

        return {}
    }
}