import { Floor } from "../entities/floor.js"

export interface FloorsRepository {
    create(floor: Floor): Promise<void>
    save(floor: Floor): Promise<void>
    delete(floor: Floor): Promise<void>
}