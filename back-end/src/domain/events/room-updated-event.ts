import type { DomainEvent } from "@/core/events/domain-event";
import type { Room } from "../entities/room";

export class RoomUpdatedEvent implements DomainEvent {
    public occuredAt: Date
    public room: Room
    public updatedData: object
    public userId: string

    constructor(room: Room, userId: string, updatedData: object) {
        this.room = room
        this.userId = userId
        this.updatedData = updatedData
        this.occuredAt = new Date()
    }

    getAggregateId(): String {
        return this.room.id
    }
}