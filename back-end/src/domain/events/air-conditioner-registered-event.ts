import type { DomainEvent } from "@/core/events/domain-event";
import type { AirConditioner } from "../entities/air-conditioner";

export class AirConditionerRegisteredEvent implements DomainEvent {
    public occuredAt: Date
    public airConditioner: AirConditioner
    public userId: string

    constructor(airConditioner: AirConditioner, userId: string) {
        this.airConditioner = airConditioner
        this.userId = userId
        this.occuredAt = new Date()
    }

    getAggregateId(): String {
        return this.airConditioner.id
    }
}