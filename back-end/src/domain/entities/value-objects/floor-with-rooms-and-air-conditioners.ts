import type { AirConditioner } from "../air-conditioner"
import type { Floor } from "../floor"
import type { Room } from "../room"

export type RoomWithAirConditioners = {
    room: Room
    airConditioners: AirConditioner[]
}

export type FloorWithRoomsAndAirConditioners = {
    floor: Floor
    rooms: RoomWithAirConditioners[]
}