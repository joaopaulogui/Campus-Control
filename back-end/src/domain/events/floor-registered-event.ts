import type { DomainEvent } from "@/core/events/domain-event";
import type { Floor } from "../entities/floor";

export class FloorRegisteredEvent implements DomainEvent {
    public occuredAt: Date
    public floor: Floor
    public userId: string

    constructor(floor: Floor, userId: string) {
        this.floor = floor
        this.userId = userId
        this.occuredAt = new Date()
    }

    getAggregateId(): String {
        return this.floor.id
    }
}