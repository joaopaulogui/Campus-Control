import { Floor } from "../entities/floor.js"

export interface FloorFilters {
    id?: string
}

export interface FloorsRepository {
    create(floor: Floor): Promise<void>
    save(floor: Floor): Promise<void>
    findById(id: string): Promise<Floor | null>
    findMany(filters?: FloorFilters): Promise<Floor[]>
    delete(floor: Floor): Promise<void>
}