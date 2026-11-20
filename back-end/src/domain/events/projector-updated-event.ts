import type { DomainEvent } from "@/core/events/domain-event";
import type { Projector } from "../entities/projector";

export class ProjectorUpdatedEvent implements DomainEvent {
    public occuredAt: Date
    public projector: Projector
    public updatedData: object
    public userId: string

    constructor(projector: Projector, userId: string, updatedData: object) {
        this.projector = projector
        this.userId = userId
        this.updatedData = updatedData
        this.occuredAt = new Date()
    }

    getAggregateId(): String {
        return this.projector.id
    }
}