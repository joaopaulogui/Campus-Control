import { Floor } from "../entities/floor.js"
import type { PaginationParams } from "../entities/value-objects/pagination-params.js"

export interface FloorFilters {
    id?: string | undefined
    buildingId?: string | undefined
    name?: string | undefined
}

export interface FloorsRepository {
    create(floor: Floor): Promise<void>
    save(floor: Floor): Promise<void>
    findById(id: string): Promise<Floor | null>
    findMany(filters?: FloorFilters): Promise<Floor[]>
    findManyPaginated(filters?: FloorFilters, params?: PaginationParams): Promise<Floor[]>
    delete(floor: Floor): Promise<void>
}