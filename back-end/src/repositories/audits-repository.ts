import type { EntityType, Audit } from "../entities/audit";

export interface AuditFilters {
    eventType: string,
    eventEntity: EntityType
    entityId: string
    description: string
}

export interface AuditsRepository {
    create(audit: Audit): Promise<void>
    findMany(filters?: AuditFilters): Promise<Audit[]>
}