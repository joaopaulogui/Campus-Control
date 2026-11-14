import type { DomainEvent } from "@/core/events/domain-event";
import type { Item } from "../entities/item";

export class ItemRegisteredEvent implements DomainEvent {
    public occuredAt: Date
    public item: Item
    public userId: string

    constructor(item: Item, userId: string) {
        this.item = item
        this.userId = userId
        this.occuredAt = new Date()
    }

    getAggregateId(): String {
        return this.item.id
    }
}