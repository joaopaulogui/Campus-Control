import type { Projector } from "@domain/entities/projector"
import type { ProjectorWhereInput } from "@generated/prisma/models"
import { prisma } from "../lib/prisma"
import { PrismaProjectorMapper } from "../mappers/prisma-projector-mapper"
import type { ProjectorFilters, ProjectorsRepository } from "@domain/repositories/projectors-repository"
import { DomainEvents } from "@/core/events/domain-events"
import type { PaginationParams } from "@/core/repositories/pagination-params"

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
        let where: ProjectorWhereInput = {}

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

        const projectors = await prisma.projector.findMany({ where, })

        return projectors.map(PrismaProjectorMapper.toDomain)
    }

    async findManyPaginated(filters?: ProjectorFilters, params: PaginationParams = { page: 1, perPage: 30 }): Promise<Projector[]> {
        let where: ProjectorWhereInput = {}

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

        const projectors = await prisma.projector.findMany({ where, })

        return projectors.map(PrismaProjectorMapper.toDomain)
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
}