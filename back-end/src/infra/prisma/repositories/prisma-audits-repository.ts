import type { Audit } from "@domain/entities/audit";
import type { Prisma } from "@generated/prisma/client";
import { prisma } from "../lib/prisma";
import { PrismaAuditMapper } from "../mappers/prisma-audit-mapper";
import type { AuditFilters, AuditsRepository } from "@domain/repositories/audits-repository";

export class PrismaAuditsRepository implements AuditsRepository {
    async create(audit: Audit): Promise<void> {
        const data = PrismaAuditMapper.toPrisma(audit)

        await prisma.audit.create({ data, })
    }

    async findMany(filters?: AuditFilters): Promise<Audit[]> {
        const where: Prisma.AuditWhereInput = {}

        if(filters?.userId) {
            where.userId = filters.userId
        }

        if(filters?.eventType) {
            where.eventType = filters.eventType
        }

        // TODO: FIX
        // if(filters?.eventEntity) {
        //     where.eventEntity = filters.eventEntity
        // }

        if(filters?.entityId) {
            where.entityId = filters.entityId
        }

        if(filters?.description) {
            where.description = { 
                contains: filters.description,
                mode: "insensitive"
            }
        }

        const audits = await prisma.audit.findMany({
            where,
            orderBy: {
                createdAt: "desc"
            }
        })

        return audits.map(PrismaAuditMapper.toDomain)
    }
}