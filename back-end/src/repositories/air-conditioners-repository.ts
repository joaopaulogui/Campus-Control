import { AirConditioner, AirConditionerStatus } from "../entities/air-conditioner.js";

export interface AirConditionerFilters {
    roomId?: string,
    status?: AirConditionerStatus
}

export interface AirConditionersRepository {
    create(airConditioner: AirConditioner): Promise<void>
    findById(id: string): Promise<AirConditioner | null>
    findMany(filters: AirConditionerFilters): Promise<AirConditioner[]>
    save(airConditioner: AirConditioner): Promise<void>
    delete(airConditioner: AirConditioner): Promise<void>
}