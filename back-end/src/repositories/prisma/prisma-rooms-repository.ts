import type { Room } from "../../entities/room";
import type { PaginationParams } from "../../entities/value-objects/pagination-params";
import type { Prisma } from "../../generated/prisma/client";
import { prisma } from "../../lib/prisma";
import { PrismaRoomMapper } from "../../mappers/prisma-room-mapper";
import type { RoomFilters, RoomsRepository } from "../rooms-repository";

export class PrismaRoomsRepository implements RoomsRepository {
    async create(room: Room): Promise<void> {
        const data = PrismaRoomMapper.toPrisma(room)

        await prisma.room.create({
            data, 
        })
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

    async findMany(filters: RoomFilters): Promise<Room[]> {
        const where: Prisma.RoomWhereInput = {}

        if(filters?.floorIds) {
            where.floorId = { in: filters.floorIds }
        }

        if(filters?.name) {
            where.name = {
                contains: filters.name,
                mode: "insensitive"
            }
        }

        const rooms = await prisma.room.findMany({
            where,
        })

        return rooms.map(PrismaRoomMapper.toDomain)
    }

    async findManyPaginated(filters: RoomFilters, params: PaginationParams = { page: 1, perPage: 30 }): Promise<Room[]> {
        const where: Prisma.RoomWhereInput = {}

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

        const rooms = await prisma.room.findMany({
            where,
            take: params.perPage,
            skip: (params.page - 1) * params.perPage
        })

        return rooms.map(PrismaRoomMapper.toDomain)
    }

    async save(room: Room): Promise<void> {
        const data = PrismaRoomMapper.toPrisma(room)

        await prisma.room.update({
            where: { id: data.id!, },
            data,
        })
    }

    async delete(room: Room): Promise<void> {
        await prisma.room.delete({
            where: { id: room.id, },
        })
    }
}