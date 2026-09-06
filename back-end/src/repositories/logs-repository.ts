import type { EntityType, Log } from "../entities/log";

export interface LogFilters {
    eventType: string,
    eventEntity: EntityType
    entityId: string
    description: string
}

export interface LogsRepository {
    create(log: Log): Promise<void>
    findMany(filters?: LogFilters): Promise<Log[]>
}