import { Floor } from "../entities/floor.js"
import type { PaginationParams } from "@core/repositories/pagination-params.js"
import type { FloorWithBuilding } from "../entities/value-objects/floor-with-building.js"

export interface FloorFilters {
    id?: string | undefined
    buildingIds?: string[] | undefined
    name?: string | undefined
}

export interface FloorsRepository {
    create(floor: Floor): Promise<void>
    save(floor: Floor): Promise<void>
    findById(id: string): Promise<Floor | null>
    findByIdWithBuilding(id: string): Promise<FloorWithBuilding | null>
    findMany(filters?: FloorFilters): Promise<Floor[]>
    findManyPaginated(filters?: FloorFilters, params?: PaginationParams): Promise<Floor[]>
    findManyWithBuilding(filters?: FloorFilters): Promise<FloorWithBuilding[]>
    findManyWithBuildingPaginated(filters?: FloorFilters, params?: PaginationParams): Promise<FloorWithBuilding[]>
    delete(floor: Floor): Promise<void>
}