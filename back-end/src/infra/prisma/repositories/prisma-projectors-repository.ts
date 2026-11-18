import type { Projector } from "@domain/entities/projector"
import { prisma } from "../lib/prisma"
import { PrismaProjectorMapper } from "../mappers/prisma-projector-mapper"
import type { ProjectorFilters, ProjectorsRepository } from "@domain/repositories/projectors-repository"
import { DomainEvents } from "@/core/events/domain-events"
import type { PaginationParams } from "@/core/repositories/pagination-params"
import type { Prisma } from "@/generated/prisma/client"
import { projectorWithRoomInclude } from "../queries/projector-with-room-query"
import { PrismaProjectorWithRoomMapper } from "../mappers/read-models/prisma-projector-with-room-mapper"
import type { ProjectorWithRoom } from "@/domain/entities/value-objects/projector-with-room"

export class PrismaProjectorsRepository implements ProjectorsRepository {
    async create(projector: Projector): Promise<void> {
        const data = PrismaProjectorMapper.toPrisma(projector)

        await prisma.projector.create({ data, })

        DomainEvents.dispatchEventsForAggregate(projector.id)
    }

    async findById(id: string): Promise<Projector | null> {
        const projector = await prisma.projector.findUnique({ where: { id }, })

        if(!projector) {
            return null
        }

        return PrismaProjectorMapper.toDomain(projector)
    }

    async findMany(filters?: ProjectorFilters): Promise<Projector[]> {
        const where = this.buildWhere(filters)

        const projectors = await prisma.projector.findMany({ 
            where, 
            orderBy: { id: "asc" },
        })

        return projectors.map(PrismaProjectorMapper.toDomain)
    }

    async findManyPaginated(filters?: ProjectorFilters, params: PaginationParams = { page: 1, perPage: 30 }): Promise<Projector[]> {
        const where = this.buildWhere(filters)

        const projectors = await prisma.projector.findMany({ 
            where, 
            orderBy: { id: "asc" },
            take: params.perPage,
            skip: (params.page-1) * params.perPage
        })

        return projectors.map(PrismaProjectorMapper.toDomain)
    }

    async findManyWithRoom(filters?: ProjectorFilters): Promise<ProjectorWithRoom[]> {
        const where = this.buildWhere(filters)

        const projectors = await prisma.projector.findMany({ 
            where, 
            include: projectorWithRoomInclude,
            orderBy: { id: "asc" },
        })

        return projectors.map(PrismaProjectorWithRoomMapper.toProjectorWithRoom)
    }

    async findManyWithRoomPaginated(filters?: ProjectorFilters, params: PaginationParams = { page: 1, perPage: 30 }): Promise<ProjectorWithRoom[]> {
        const where = this.buildWhere(filters)

        const projectors = await prisma.projector.findMany({ 
            where, 
            include: projectorWithRoomInclude,
            orderBy: { id: "asc" },
            take: params.perPage,
            skip: (params.page-1) * params.perPage
        })

        return projectors.map(PrismaProjectorWithRoomMapper.toProjectorWithRoom)
    }

    async save(projector: Projector): Promise<void> {
        const data = PrismaProjectorMapper.toPrisma(projector)

        await prisma.projector.update({
            where: { id: projector.id },
            data,
        })

        DomainEvents.dispatchEventsForAggregate(projector.id)
    }

    async delete(projector: Projector): Promise<void> {
        await prisma.projector.delete({
            where: { id: projector.id },
        })

        DomainEvents.dispatchEventsForAggregate(projector.id)
    }

    private buildWhere(filters?: ProjectorFilters): Prisma.ProjectorWhereInput {
        const where: Prisma.ProjectorWhereInput = {}

        if(filters?.roomIds) {
            where.roomId = { in: filters.roomIds }
        }

        if(filters?.floorIds) {
            where.room = {
                floorId: { in: filters.floorIds }
            }
        }

        if(filters?.buildingIds) {
            where.room = {
                floor: {
                    buildingId: { in: filters.buildingIds }
                }
            }
        }

        if(filters?.status) {
            where.status = filters.status
        }

        return where
    }
}