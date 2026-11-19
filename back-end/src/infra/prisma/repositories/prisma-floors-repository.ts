import type { Floor } from "@domain/entities/floor";
import { PrismaFloorMapper } from "../mappers/prisma-floor-mapper";
import type { FloorFilters, FloorsRepository } from "@domain/repositories/floors-repository";
import { prisma } from "../lib/prisma";
import type { Prisma } from "@generated/prisma/client";
import type { PaginationParams } from "@core/repositories/pagination-params";
import { DomainEvents } from "@/core/events/domain-events";
import { floorWithBuildingInclude } from "../queries/floor-with-building-query";
import { PrismaFloorWithBuildingMapper } from "../mappers/read-models/prisma-floor-with-building-mapper";
import type { FloorWithBuilding } from "@/domain/entities/value-objects/floor-with-building";

export class PrismaFloorsRepository implements FloorsRepository {
    async create(floor: Floor): Promise<void> {
        const data = PrismaFloorMapper.toPrisma(floor)

        await prisma.floor.create({ data, })

        DomainEvents.dispatchEventsForAggregate(floor.id)
    }

    async findById(id: string): Promise<Floor | null> {
        const floor = await prisma.floor.findUnique({ where: {id}, })
    
        if(!floor) {
            return null
        }
        
        return PrismaFloorMapper.toDomain(floor)
    }

    async findByIdWithBuilding(id: string): Promise<FloorWithBuilding | null> {
        const floor = await prisma.floor.findUnique({ 
            where: { id },
            include: {
                building: {
                    select: {
                        name: true,
                    }
                }
            } 
        })
    
        if(!floor) {
            return null
        }
        
        return PrismaFloorWithBuildingMapper.toFloorWithBuilding(floor)
    }

    async findMany(filters?: FloorFilters): Promise<Floor[]> {
        const where = this.buildWhere(filters)

        const floors = await prisma.floor.findMany({
            where,
            orderBy: {
                name: "asc"
            },
        })

        return floors.map(PrismaFloorMapper.toDomain)
    }

    async findManyPaginated(filters?: FloorFilters, params: PaginationParams = { page: 1, perPage: 30 }): Promise<Floor[]> {
        const where = this.buildWhere(filters)

        const floors = await prisma.floor.findMany({
            where,
            orderBy: {
                name: "asc"
            },
            take: params.perPage,
            skip: (params.page-1) * params.perPage
        })

        return floors.map(PrismaFloorMapper.toDomain)
    }

    async findManyWithBuilding(filters?: FloorFilters): Promise<FloorWithBuilding[]> {
        const where = this.buildWhere(filters)

        const floors = await prisma.floor.findMany({
            where,
            include: floorWithBuildingInclude,
            orderBy: {
                name: "asc"
            },
        })

        return floors.map(PrismaFloorWithBuildingMapper.toFloorWithBuilding)
    }

    async findManyWithBuildingPaginated(filters?: FloorFilters, params: PaginationParams = { page: 1, perPage: 30 }): Promise<FloorWithBuilding[]> {
        const where = this.buildWhere(filters)

        const floors = await prisma.floor.findMany({
            where,
            include: floorWithBuildingInclude,
            orderBy: {
                name: "asc"
            },
            take: params.perPage,
            skip: (params.page-1) * params.perPage
        })

        return floors.map(PrismaFloorWithBuildingMapper.toFloorWithBuilding)
    }

    async save(floor: Floor): Promise<void> {
        const data = PrismaFloorMapper.toPrisma(floor)

        await prisma.floor.update({
            where: { id: data.id! }, 
            data, 
        })

        DomainEvents.dispatchEventsForAggregate(floor.id)
    }

    async delete(floor: Floor): Promise<void> {
        await prisma.floor.delete({ 
            where: { id: floor.id }, 
        })

        DomainEvents.dispatchEventsForAggregate(floor.id)
    }

    private buildWhere(filters?: FloorFilters): Prisma.FloorWhereInput {
        const where: Prisma.FloorWhereInput = {}

        if(filters?.id) {
            where.id = filters.id
        }

        if(filters?.buildingIds) {
            where.buildingId = { in: filters.buildingIds }
        }

        if(filters?.name) {
            where.name = {
                contains: filters.name,
                mode: "insensitive"
            }
        }

        return where
    }
}