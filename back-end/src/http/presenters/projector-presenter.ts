import type { Projector } from "../../entities/projector";

export class ProjectorPresenter {
    static toHTTP(projector: Projector) {
        return {
            id: projector.id,
            status: projector.status,
            roomId: projector.roomId,
        }
    }
}