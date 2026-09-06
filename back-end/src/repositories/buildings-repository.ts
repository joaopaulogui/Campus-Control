import type { Building } from "../entities/building";

export interface BuildingFilters {
    id?: string | undefined
}

export interface BuildingsRepository {
    create(building: Building): Promise<void>
    findById(id: string): Promise<Building | null>
    findMany(filters?: BuildingFilters): Promise<Building[]>
    save(building: Building): Promise<void>
    delete(building: Building): Promise<void>
}