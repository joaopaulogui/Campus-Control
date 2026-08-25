import { AirConditioner } from "../entities/air-conditioner";

export interface AirConditionersRepository {
    create(airConditioner: AirConditioner): Promise<void>
    findById(id: string): Promise<AirConditioner | null>
    findManyByRoomId(roomId: string): Promise<AirConditioner[]>
    findManyByFloorId(floorId: string): Promise<AirConditioner[]>
    save(airConditioner: AirConditioner): Promise<void>
    delete(airConditioner: AirConditioner): Promise<void>
}