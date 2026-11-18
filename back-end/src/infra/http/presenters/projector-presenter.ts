import type { ProjectorWithRoom } from "@/domain/entities/value-objects/projector-with-room";
import type { Projector } from "@domain/entities/projector";

export class ProjectorPresenter {
    static toHTTP(projector: Projector) {
        return {
            id: projector.id,
            status: projector.status.toString(),
            roomId: projector.roomId,
            updatedAt: projector.updatedAt?.toISOString()
        }
    }

    static toHttpWithRoom(projector: ProjectorWithRoom) {
        return {
            id: projector.id,
            status: projector.status.toString(),
            roomId: projector.roomId,
            roomName: projector.roomName,
            updatedAt: projector.updatedAt?.toISOString(),
        }
    }
}