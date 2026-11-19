import type { PaginationParams } from "@/core/repositories/pagination-params";
import { Projector, ProjectorStatus } from "../entities/projector";
import type { ProjectorWithRoom } from "../entities/value-objects/projector-with-room";

export interface ProjectorFilters {
    buildingIds?: string[] | undefined,
    floorIds?: string[] | undefined,
    roomIds?: string[] | undefined,
    status?: ProjectorStatus | undefined,
}

export interface ProjectorsRepository {
    create(projector: Projector): Promise<void>
    findById(id: string): Promise<Projector | null>
    findMany(filters?: ProjectorFilters): Promise<Projector[]>
    findManyPaginated(filters?: ProjectorFilters, params?: PaginationParams): Promise<Projector[]>
    findManyWithRoom(filters?: ProjectorFilters): Promise<ProjectorWithRoom[]>
    findManyWithRoomPaginated(filters?: ProjectorFilters, params?: PaginationParams): Promise<ProjectorWithRoom[]>
    save(projector: Projector): Promise<void>
    delete(projector: Projector): Promise<void>
}