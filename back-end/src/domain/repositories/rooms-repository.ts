import { Room, RoomType } from "../entities/room.js";
import type { PaginationParams } from "@core/repositories/pagination-params.js";
import type { RoomContext } from "../entities/value-objects/room-context.js";

export interface RoomFilters {
    buildingIds?: string[] | undefined
    floorIds?: string[] | undefined
    name?: string | undefined
    type?: RoomType | undefined
    isLocked?: boolean | undefined
}

export interface RoomsRepository {
    create(room: Room): Promise<void>
    findById(id: string): Promise<Room | null>
    findByIdWithContext(id: string): Promise<RoomContext | null>
    findMany(filters?: RoomFilters): Promise<Room[]>
    findManyPaginated(filters?: RoomFilters, params?: PaginationParams): Promise<Room[]>
    findManyWithContext(filters?: RoomFilters): Promise<RoomContext[]>
    findManyWithContextPaginated(filters?: RoomFilters, params?: PaginationParams): Promise<RoomContext[]>
    save(room: Room): Promise<void>
    delete(room: Room): Promise<void>
}