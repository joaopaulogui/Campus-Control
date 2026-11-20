import type { DomainEvent } from "@/core/events/domain-event";
import type { Floor } from "../entities/floor";

export class FloorUpdatedEvent implements DomainEvent {
    public occuredAt: Date
    public floor: Floor
    public updatedData: object
    public userId: string

    constructor(floor: Floor, userId: string, updatedData: object) {
        this.floor = floor
        this.userId = userId
        this.updatedData = updatedData
        this.occuredAt = new Date()
    }

    getAggregateId(): String {
        return this.floor.id
    }
}