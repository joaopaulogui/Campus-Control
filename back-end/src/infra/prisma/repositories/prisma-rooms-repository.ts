import type { Room } from "@domain/entities/room";
import type { PaginationParams } from "@core/repositories/pagination-params";
import type { Prisma } from "@generated/prisma/client";
import { prisma } from "../lib/prisma";
import { PrismaRoomMapper } from "../mappers/prisma-room-mapper";
import type { RoomFilters, RoomsRepository } from "@domain/repositories/rooms-repository";
import { DomainEvents } from "@/core/events/domain-events";
import { roomContextInclude } from "../queries/room-context-query";
import { PrismaRoomContextMapper } from "../mappers/read-models/prisma-room-context-mapper";
import type { RoomContext } from "@/domain/entities/value-objects/room-context";

export class PrismaRoomsRepository implements RoomsRepository {
    async create(room: Room): Promise<void> {
        const data = PrismaRoomMapper.toPrisma(room)

        await prisma.room.create({
            data, 
        })

        DomainEvents.dispatchEventsForAggregate(room.id)
    }

    async findById(id: string): Promise<Room | null> {
        const room = await prisma.room.findUnique({
            where: {
                id,
            }
        })

        if(!room) {
            return null
        }

        return PrismaRoomMapper.toDomain(room)
    }

    async findMany(filters?: RoomFilters): Promise<Room[]> {
        const where = this.buildWhere(filters)

        const rooms = await prisma.room.findMany({
            where,
            orderBy: {
                name: "asc"
            }
        })

        return rooms.map(PrismaRoomMapper.toDomain)
    }

    async findManyPaginated(filters?: RoomFilters, params: PaginationParams = { page: 1, perPage: 30 }): Promise<Room[]> {
        const where = this.buildWhere(filters)

        const rooms = await prisma.room.findMany({
            where,
            orderBy: {
                name: "asc"
            },
            take: params.perPage,
            skip: (params.page - 1) * params.perPage
        })

        return rooms.map(PrismaRoomMapper.toDomain)
    }

    async findManyWithContext(filters?: RoomFilters): Promise<RoomContext[]> {
        const where = this.buildWhere(filters)

        const rooms = await prisma.room.findMany({
            where,
            include: roomContextInclude,
            orderBy: {
                name: "asc"
            }
        })

        return rooms.map(PrismaRoomContextMapper.toContext)
    }

    async findManyWithContextPaginated(filters?: RoomFilters, params: PaginationParams = { page: 1, perPage: 30 }): Promise<RoomContext[]> {
        const where = this.buildWhere(filters)

        const rooms = await prisma.room.findMany({
            where,
            include: roomContextInclude,
            orderBy: {
                name: "asc"
            },
            take: params.perPage,
            skip: (params.page - 1) * params.perPage
        })

        return rooms.map(PrismaRoomContextMapper.toContext)
    }

    async save(room: Room): Promise<void> {
        const data = PrismaRoomMapper.toPrisma(room)

        await prisma.room.update({
            where: { id: data.id!, },
            data,
        })

        DomainEvents.dispatchEventsForAggregate(room.id)
    }

    async delete(room: Room): Promise<void> {
        await prisma.room.delete({
            where: { id: room.id, },
        })

        DomainEvents.dispatchEventsForAggregate(room.id)
    }

    private buildWhere(filters?: RoomFilters): Prisma.RoomWhereInput {
        const where: Prisma.RoomWhereInput = {}

        if(filters?.buildingIds) {
            where.floor = {
                buildingId: { in: filters.buildingIds }
            }
        }

        if(filters?.floorIds) {
            where.floorId = { in: filters.floorIds }
        }

        if(filters?.name) {
            where.name = {
                contains: filters.name,
                mode: "insensitive"
            }
        }

        if(filters?.type) {
            where.type = filters.type
        }

        if(filters?.isLocked !== undefined) {
            where.isLocked = filters.isLocked
        }

        return where
    }
}