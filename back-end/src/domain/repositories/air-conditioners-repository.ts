import type { PaginationParams } from "@/core/repositories/pagination-params.js";
import { AirConditioner, AirConditionerStatus } from "../entities/air-conditioner.js";
import type { AirConditionerWithRoom } from "../entities/value-objects/air-conditioner-with-room.js";

export interface AirConditionerFilters {
    buildingIds?: string[] | undefined,
    floorIds?: string[] | undefined,
    roomIds?: string[] | undefined,
    status?: AirConditionerStatus | undefined,
}

export interface AirConditionersRepository {
    create(airConditioner: AirConditioner): Promise<void>
    findById(id: string): Promise<AirConditioner | null>
    findMany(filters?: AirConditionerFilters): Promise<AirConditioner[]>
    findManyPaginated(filters?: AirConditionerFilters, params?: PaginationParams): Promise<AirConditioner[]>
    findManyWithRoom(filters?: AirConditionerFilters): Promise<AirConditionerWithRoom[]>
    findManyWithRoomPaginated(filters?: AirConditionerFilters, params?: PaginationParams): Promise<AirConditionerWithRoom[]>
    save(airConditioner: AirConditioner): Promise<void>
    delete(airConditioner: AirConditioner): Promise<void>
}