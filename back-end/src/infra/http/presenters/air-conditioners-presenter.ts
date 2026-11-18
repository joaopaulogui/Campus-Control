import type { AirConditionerWithRoom } from "@/domain/entities/value-objects/air-conditioner-with-room";
import type { AirConditioner } from "@domain/entities/air-conditioner";

export class AirConditionerPresenter {
    static toHTTP(airConditioner: AirConditioner) {
        return {
            id: airConditioner.id,
            status: airConditioner.status.toString(),
            temperature: airConditioner.temperature,
            isOn: airConditioner.isOn,
            roomId: airConditioner.roomId,
            updatedAt: airConditioner.updatedAt?.toISOString(),
        }
    }
    
    static toHttpWithRoom(airConditioner: AirConditionerWithRoom) {
        return {
            id: airConditioner.id,
            status: airConditioner.status.toString(),
            temperature: airConditioner.temperature,
            isOn: airConditioner.isOn,
            roomId: airConditioner.roomId,
            roomName: airConditioner.roomName,
            updatedAt: airConditioner.updatedAt?.toISOString(),
        }
    }
}