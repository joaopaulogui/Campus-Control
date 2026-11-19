import type { RoomContext } from "@/domain/entities/value-objects/room-context";
import type { PrismaRoomContext } from "../../queries/room-context-query";
import { RoomType as DomainRoomType } from "@domain/entities/room";
import { AirConditionerStatus as DomainAirConditionerStatus } from "@domain/entities/air-conditioner"
import { ProjectorStatus as DomainProjectorStatus } from "@domain/entities/projector"

type PrismaAirConditionerContext = PrismaRoomContext["airConditioners"][number]
type PrismaProjectorContext = PrismaRoomContext["projectors"][number]

export class PrismaRoomContextMapper {
    static toContext(raw: PrismaRoomContext): RoomContext {
        const mappedType = DomainRoomType[raw.type as keyof typeof DomainRoomType];

        return {
            id: raw.id,
            name: raw.name,
            type: mappedType,
            capacity: raw.capacity,
            isLocked: raw.isLocked,
            updatedAt: raw.updatedAt,
            floorId: raw.floorId,
            floorName: raw.floor.name,
            buildingId: raw.floor.buildingId,
            buildingName: raw.floor.building.name,
            airConditioners: raw.airConditioners.map(PrismaRoomContextMapper.toAirConditionerContext),
            projectors: raw.projectors.map(PrismaRoomContextMapper.toProjectorContext)
        }
    }

    private static toAirConditionerContext(airConditioner: PrismaAirConditionerContext) {
        const mappedACStatus = DomainAirConditionerStatus[airConditioner.status as keyof typeof DomainAirConditionerStatus]

        return {
            id: airConditioner.id,
            status: mappedACStatus,
            isOn: airConditioner.isOn,
            temperature: airConditioner.temperature,
            updatedAt: airConditioner.updatedAt,
        }
    }

    private static toProjectorContext(projector: PrismaProjectorContext) {
        const mappedProjectorStatus = DomainProjectorStatus[projector.status as keyof typeof DomainProjectorStatus]
                
        return {
            id: projector.id,
            status: mappedProjectorStatus,
            updatedAt: projector.updatedAt
        }
    }
}