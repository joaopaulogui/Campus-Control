import { Room } from "../entities/room.js";

export interface RoomFilters {
    floorId?: string | undefined
}

export interface RoomsRepository {
    create(room: Room): Promise<void>
    findById(id: string): Promise<Room | null>
    findMany(filters?: RoomFilters): Promise<Room[]>
    save(room: Room): Promise<void>
    delete(room: Room): Promise<void>
}