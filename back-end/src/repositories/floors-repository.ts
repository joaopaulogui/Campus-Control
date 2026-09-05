import type { AirConditioner } from "../entities/air-conditioner.js"
import { Floor } from "../entities/floor.js"
import type { Room } from "../entities/room.js"

export interface FloorFilters {
    id?: string | undefined
}

export type RoomWithAirConditioners = {
    room: Room
    airConditioners: AirConditioner[]
}

export type FloorWithRoomsAndAirConditioners = {
    floor: Floor
    rooms: RoomWithAirConditioners[]
}

export interface FloorsRepository {
    create(floor: Floor): Promise<void>
    save(floor: Floor): Promise<void>
    findById(id: string): Promise<Floor | null>
    findMany(filters?: FloorFilters): Promise<Floor[]>
    delete(floor: Floor): Promise<void>
}