import type { AirConditioner } from "@domain/entities/air-conditioner";

export class AirConditionerPresenter {
    static toHTTP(airConditioner: AirConditioner) {
        return {
            id: airConditioner.id,
            status: airConditioner.status,
            temperature: airConditioner.temperature,
            isOn: airConditioner.isOn,
            roomId: airConditioner.roomId,
        }
    }
    
}