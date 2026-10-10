import type { Building } from "../entities/building";
import type { PaginationParams } from "../entities/value-objects/pagination-params";

export interface BuildingFilters {
    id?: string | undefined,
    name: string | undefined,
}

export interface BuildingsRepository {
    create(building: Building): Promise<void>
    findById(id: string): Promise<Building | null>
    findMany(filters?: BuildingFilters): Promise<Building[]>
    findManyPaginated(filters?: BuildingFilters, params?: PaginationParams): Promise<Building[]>
    save(building: Building): Promise<void>
    delete(building: Building): Promise<void>
}