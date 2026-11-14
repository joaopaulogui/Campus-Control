import type { Building } from "../entities/building";
import type { DomainEvent } from "@core/events/domain-event";

export class BuildingRegisteredEvent implements DomainEvent {
    public occuredAt: Date
    public building: Building
    public userId: string

    constructor(building: Building, userId: string) {
        this.building = building
        this.userId = userId
        this.occuredAt = new Date()
    }

    getAggregateId(): String {
        return this.building.id
    }
}