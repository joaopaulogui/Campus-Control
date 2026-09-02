import { Room, RoomType as DomainRoomType } from "../entities/room";
import { Prisma, type Room as PrismaRoom, RoomType as PrismaRoomType } from '../generated/prisma/client'

export class PrismaRoomMapper {
    static toDomain(raw: PrismaRoom): Room {
        const mappedType = DomainRoomType[raw.type as keyof typeof DomainRoomType];

        return new Room({
            name: raw.name,
            type: mappedType,
            capacity: raw.capacity,
            floorId: raw.floorId,
            isLocked: raw.isLocked,
        }, raw.id)
    }

    static toPrisma(room: Room): Prisma.RoomUncheckedCreateInput {
        const mappedType = PrismaRoomType[room.type as keyof typeof PrismaRoomType];

        return {
            name: room.name,
            type: mappedType,
            capacity: room.capacity,
            floorId: room.floorId,
            isLocked: room.isLocked,
        }
    }
}