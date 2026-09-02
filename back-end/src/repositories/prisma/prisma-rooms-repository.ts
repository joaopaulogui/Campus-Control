import type { Room } from "../../entities/room";
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

        if(filters?.floorId) {
            where.floorId = filters.floorId
        }

        const rooms = await prisma.room.findMany({
            where,
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
        const data = PrismaRoomMapper.toPrisma(room)

        await prisma.room.delete({
            where: { id: data.id!, },
        })
    }
}