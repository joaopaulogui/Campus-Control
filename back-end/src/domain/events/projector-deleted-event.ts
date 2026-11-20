import type { DomainEvent } from "@/core/events/domain-event";
import type { Projector } from "../entities/projector";

export class ProjectorDeletedEvent implements DomainEvent {
    public occuredAt: Date
    public projector: Projector
    public userId: string

    constructor(projector: Projector, userId: string) {
        this.projector = projector
        this.userId = userId
        this.occuredAt = new Date()
    }

    getAggregateId(): String {
        return this.projector.id
    }
}