import type { AirConditioner } from "../entities/air-conditioner";
import type { FloorWithRoomsAndAirConditioners } from "../repositories/floors-repository";

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
    
    static toHTTPGrouped(groupedAirConditioners: FloorWithRoomsAndAirConditioners) {
        const { floor, rooms } = groupedAirConditioners
        
        return {
            floorName: floor.name,
            rooms: rooms.map((roomWithAC) => ({
                name: roomWithAC.room.name,
                airConditioners: roomWithAC.airConditioners.map((airConditioner) => ({
                    id: airConditioner.id,
                    status: airConditioner.status,
                    temperature: airConditioner.temperature,
                    isOn: airConditioner.isOn
                }))
            }))
        }
    }    
}