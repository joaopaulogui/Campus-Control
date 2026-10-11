import type { EntityType, Audit } from "../entities/audit";

export interface AuditFilters {
    userId?: string | null | undefined
    eventType?: string | undefined,
    eventEntity?: EntityType | undefined,
    entityId?: string | undefined,
    description?: string | undefined,
}

export interface AuditsRepository {
    create(audit: Audit): Promise<void>
    findMany(filters?: AuditFilters): Promise<Audit[]>
}