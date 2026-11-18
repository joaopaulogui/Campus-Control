import type { ProjectorWithRoom } from "@/domain/entities/value-objects/projector-with-room";
import type { PrismaProjectorWithRoom } from "../../queries/projector-with-room-query";
import { ProjectorStatus as DomainProjectorStatus } from "@/domain/entities/projector";

export class PrismaProjectorWithRoomMapper {
    static toProjectorWithRoom(raw: PrismaProjectorWithRoom): ProjectorWithRoom {
        const mappedStatus = DomainProjectorStatus[raw.status as keyof typeof DomainProjectorStatus]

        return {
            id: raw.id,
            status: mappedStatus,
            roomId: raw.roomId,
            roomName: raw.room.name,
            updatedAt: raw.updatedAt,
        }
    }
}