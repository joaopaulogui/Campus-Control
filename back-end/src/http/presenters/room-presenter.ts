import type { Room } from "../../entities/room"

export class RoomsPresenter {
    static toHTTP(room: Room) {
        return {
            id: room.id,
            name: room.name,
            type: room.type.toString(),
            capacity: room.capacity,
            isLocked: room.isLocked
        }
    }
}