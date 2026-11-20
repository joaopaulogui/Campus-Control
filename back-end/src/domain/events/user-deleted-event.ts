import type { DomainEvent } from "@/core/events/domain-event";
import type { User } from "../entities/user";

export class UserDeletedEvent implements DomainEvent {
    public occuredAt: Date
    public user: User
    public adminId: string

    constructor(user: User, adminId: string) {
        this.user = user,
        this.adminId = adminId,
        this.occuredAt = new Date()
    }

    getAggregateId(): String {
        return this.user.id
    }
}