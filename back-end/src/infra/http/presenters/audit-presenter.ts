import type { Audit } from "@/domain/entities/audit";

export class AuditPresenter {
    static toHttp(audit: Audit) {
        return {
            userId: audit.userId,
            eventType: audit.eventType,
            eventEntity: audit.eventEntity,
            entityId: audit.entityId,
            description: audit.description,
            createdAt: audit.createdAt,
            metadata: audit.metadata,
        }
    }
}