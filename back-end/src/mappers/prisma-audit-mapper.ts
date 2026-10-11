import { Audit, EntityType as DomainEntityType } from "../entities/audit";
import { Prisma, type Audit as PrismaAudit, EntityType as PrismaEntityType } from "../generated/prisma/client";

function asObject(value: Prisma.JsonValue): Record<string, unknown> {
    if(value === null) {
        return {}
    }

    if(typeof value === "object" && !Array.isArray(value)) {
        return value as Record<string, unknown>
    }

    throw new Error()
}

export class PrismaAuditMapper {
    static toDomain(raw: PrismaAudit): Audit {
        const mappedEventEntity = DomainEntityType[raw.eventEntity as keyof typeof DomainEntityType]

        return new Audit({
            userId: raw.userId,
            eventType: raw.eventType,
            eventEntity: mappedEventEntity,
            entityId: raw.entityId,
            description: raw.description,
            createdAt: raw.createdAt,
            metadata: asObject(raw.metadata)
        }, raw.id)
    }

    static toPrisma(audit: Audit): Prisma.AuditUncheckedCreateInput {
        const mappedEventEntity = PrismaEntityType[audit.eventEntity as keyof typeof PrismaEntityType]
        
        return {
            id: audit.id,
            userId: audit.userId ?? null,
            eventType: audit.eventType,
            eventEntity: mappedEventEntity,
            entityId: audit.entityId,
            description: audit.description,
            createdAt: audit.createdAt,
            metadata: audit.metadata
        }
    }
}