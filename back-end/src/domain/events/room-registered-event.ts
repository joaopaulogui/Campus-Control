import type { DomainEvent } from "@/core/events/domain-event";
import type { Room } from "../entities/room";

export class RoomRegisteredEvent implements DomainEvent {
    public occuredAt: Date
    public room: Room
    public userId: string

    constructor(room: Room, userId: string) {
        this.room = room
        this.userId = userId
        this.occuredAt = new Date()
    }

    getAggregateId(): String {
        return this.room.id
    }
}