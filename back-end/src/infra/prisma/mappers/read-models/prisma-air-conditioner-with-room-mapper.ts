import type { AirConditionerWithRoom } from "@/domain/entities/value-objects/air-conditioner-with-room";
import type { PrismaAirConditionerWithRoom } from "../../queries/air-conditioner-with-room-query";
import { AirConditionerStatus as DomainAirConditionerStatus } from "@domain/entities/air-conditioner"; 

export class PrismaAirConditionerWithRoomMapper {
    static toAirConditionerWithRoom(raw: PrismaAirConditionerWithRoom): AirConditionerWithRoom {
        const mappedStatus = DomainAirConditionerStatus[raw.status as keyof typeof DomainAirConditionerStatus]

        return {
            id: raw.id,
            status: mappedStatus,
            isOn: raw.isOn,
            temperature: raw.temperature,
            roomId: raw.roomId,
            roomName: raw.room.name,
            updatedAt: raw.updatedAt
        }
    }
}