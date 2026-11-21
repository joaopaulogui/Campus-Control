import type { DomainEvent } from "@/core/events/domain-event";
import type { AirConditioner } from "../entities/air-conditioner";

export class AirConditionerUpdatedEvent implements DomainEvent {
    public occuredAt: Date
    public airConditioner: AirConditioner
    public updatedData: object
    public userId: string

    constructor(airConditioner: AirConditioner, userId: string, updatedData: object) {
        this.airConditioner = airConditioner
        this.userId = userId
        this.updatedData = updatedData
        this.occuredAt = new Date()
    }

    getAggregateId(): String {
        return this.airConditioner.id
    }
}