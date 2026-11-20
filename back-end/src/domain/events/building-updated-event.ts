import type { Building } from "../entities/building";
import type { DomainEvent } from "@core/events/domain-event";

export class BuildingUpdatedEvent implements DomainEvent {
    public occuredAt: Date
    public building: Building
    public updatedData: object
    public userId: string

    constructor(building: Building, userId: string, updatedData: object) {
        this.building = building
        this.userId = userId
        this.updatedData = updatedData
        this.occuredAt = new Date()
    }

    getAggregateId(): String {
        return this.building.id
    }
}