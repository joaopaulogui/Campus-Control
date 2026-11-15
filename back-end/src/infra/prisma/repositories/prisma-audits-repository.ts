import type { Audit } from "@domain/entities/audit";
import type { Prisma } from "@generated/prisma/client";
import { prisma } from "../lib/prisma";
import { PrismaAuditMapper } from "../mappers/prisma-audit-mapper";
import type { AuditFilters, AuditsRepository } from "@domain/repositories/audits-repository";
import type { PaginationParams } from "@/core/repositories/pagination-params";

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

        if(filters?.eventEntity) {
            where.eventEntity = filters.eventEntity
        }

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

    async findManyPaginated(filters?: AuditFilters, params: PaginationParams = { page: 1, perPage: 30 }): Promise<Audit[]> {
        const where: Prisma.AuditWhereInput = {}

        if(filters?.userId) {
            where.userId = filters.userId
        }

        if(filters?.eventType) {
            where.eventType = filters.eventType
        }

        if(filters?.eventEntity) {
            where.eventEntity = filters.eventEntity
        }

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
            },
            take: params.perPage,
            skip: (params.page-1) * params.perPage
        })

        return audits.map(PrismaAuditMapper.toDomain)
    }
}