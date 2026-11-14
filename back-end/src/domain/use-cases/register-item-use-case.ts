import { Item, type ItemType } from "../entities/item"
import { ItemRegisteredEvent } from "../events/item-registered-event"
import type { ItemsRepository } from "../repositories/items-repository"

interface RegisterItemUseCaseRequest {
    userId: string
    name: string
    type: ItemType
    totalQuantity: number
}

interface RegisterItemUseCaseResponse {}

export class RegisterItemUseCase {
    constructor(private itemsRepository: ItemsRepository) {}

    async execute({ userId, name, type, totalQuantity }: RegisterItemUseCaseRequest): Promise<RegisterItemUseCaseResponse> {
        const item = new Item({
            name,
            type,
            totalQuantity,
            availableQuantity: totalQuantity,
            onHoldQuantity: 0,
        })

        item.addDomainEvent(new ItemRegisteredEvent(item, userId))

        await this.itemsRepository.create(item)

        return {}
    }
}