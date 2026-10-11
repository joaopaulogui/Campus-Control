import { Room, RoomType } from "../entities/room.js";
import type { PaginationParams } from "@core/repositories/pagination-params.js";

export interface RoomFilters {
    floorIds?: string[] | undefined
    name?: string | undefined
    type?: RoomType | undefined
    isLocked?: boolean | undefined
}

export interface RoomsRepository {
    create(room: Room): Promise<void>
    findById(id: string): Promise<Room | null>
    findMany(filters?: RoomFilters): Promise<Room[]>
    findManyPaginated(filters?: RoomFilters, params?: PaginationParams): Promise<Room[]>
    save(room: Room): Promise<void>
    delete(room: Room): Promise<void>
}