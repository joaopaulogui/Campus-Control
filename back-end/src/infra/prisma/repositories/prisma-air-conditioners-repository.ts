import type { AirConditioner } from "@domain/entities/air-conditioner";
import { prisma } from "../lib/prisma";
import { Prisma } from "@generated/prisma/client"
import { PrismaAirConditionerMapper } from "../mappers/prisma-air-conditioner-mapper";
import type { AirConditionerFilters, AirConditionersRepository } from "@domain/repositories/air-conditioners-repository";
import { DomainEvents } from "@/core/events/domain-events";
import type { PaginationParams } from "@/core/repositories/pagination-params";
import type { AirConditionerWithRoom } from "@/domain/entities/value-objects/air-conditioner-with-room";
import { PrismaAirConditionerWithRoomMapper } from "../mappers/read-models/prisma-air-conditioner-with-room-mapper";
import { airConditionerWithRoomInclude } from "../queries/air-conditioner-with-room-query";

export class PrismaAirConditionersRepository implements AirConditionersRepository {
    async create(airConditioner: AirConditioner): Promise<void> {
        const data = PrismaAirConditionerMapper.toPrisma(airConditioner)

        await prisma.airConditioner.create({ data, })

        DomainEvents.dispatchEventsForAggregate(airConditioner.id)
    }

    async findById(id: string): Promise<AirConditioner | null> {
        const airConditioner = await prisma.airConditioner.findUnique({
            where: { id, }
        })

        if(!airConditioner) {
            return null
        }

        return PrismaAirConditionerMapper.toDomain(airConditioner)
    }

    async findMany(filters?: AirConditionerFilters): Promise<AirConditioner[]> {
        const where = this.buildWhere(filters)

        const airConditioners = await prisma.airConditioner.findMany({
            where,
            orderBy: { id: "asc" },
        })

        return airConditioners.map(PrismaAirConditionerMapper.toDomain)
    }

    async findManyPaginated(filters?: AirConditionerFilters, params: PaginationParams = { page: 1, perPage: 30 }): Promise<AirConditioner[]> {
        const where = this.buildWhere(filters)

        const airConditioners = await prisma.airConditioner.findMany({
            where,
            orderBy: { id: "asc" },
            take: params.perPage,
            skip: (params.page-1) * params.perPage
        })

        return airConditioners.map(PrismaAirConditionerMapper.toDomain)
    }

    async findManyWithRoom(filters?: AirConditionerFilters): Promise<AirConditionerWithRoom[]> {
        const where = this.buildWhere(filters)

        const airConditioners = await prisma.airConditioner.findMany({
            where,
            include: airConditionerWithRoomInclude,
            orderBy: { id: "asc" },
        })

        return airConditioners.map(PrismaAirConditionerWithRoomMapper.toAirConditionerWithRoom)
    }

    async findManyWithRoomPaginated(filters?: AirConditionerFilters, params: PaginationParams = { page: 1, perPage: 30 }): Promise<AirConditionerWithRoom[]> {
        const where = this.buildWhere(filters)

        const airConditioners = await prisma.airConditioner.findMany({
            where,
            include: airConditionerWithRoomInclude,
            orderBy: { id: "asc" },
            take: params.perPage,
            skip: (params.page-1) * params.perPage
        })

        return airConditioners.map(PrismaAirConditionerWithRoomMapper.toAirConditionerWithRoom)
    }

    async save(airConditioner: AirConditioner): Promise<void> {
        const data = PrismaAirConditionerMapper.toPrisma(airConditioner)

        await prisma.airConditioner.update({
            where: { id: data.id! },
            data,
        })

        DomainEvents.dispatchEventsForAggregate(airConditioner.id)
    }

    async delete(airConditioner: AirConditioner): Promise<void> {
        await prisma.airConditioner.delete({
            where: { id: airConditioner.id },
        })

        DomainEvents.dispatchEventsForAggregate(airConditioner.id)
    }

    private buildWhere(filters?: AirConditionerFilters): Prisma.AirConditionerWhereInput {
        const where: Prisma.AirConditionerWhereInput = {}

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