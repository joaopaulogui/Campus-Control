import { AirConditioner } from "../entities/air-conditioner.js";

export interface AirConditionersRepository {
    create(airConditioner: AirConditioner): Promise<void>
    findById(id: string): Promise<AirConditioner | null>
    findMany(floorId?: string): Promise<AirConditioner[]>
    save(airConditioner: AirConditioner): Promise<void>
    delete(airConditioner: AirConditioner): Promise<void>
}