import type { Floor } from "../entities/floor"
import type { Room } from "../entities/room"

export interface FloorWithRooms {
    floor: Floor
    rooms: Room[]
}

export class FloorWithRoomsPresenter {
    static toHTTP(floorWithRooms: FloorWithRooms) {
        const formattedRooms = floorWithRooms.rooms.map(room => ({
            id: room.id,
            name: room.name,
            type: room.type.toString(),
            capacity: room.capacity,
            isLocked: room.isLocked
        }))

        return {
            id: floorWithRooms.floor.id,
            name: floorWithRooms.floor.name,
            rooms: formattedRooms,
        }
    }
}