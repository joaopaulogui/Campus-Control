import type { AirConditioner } from "@domain/entities/air-conditioner"
import type { Projector } from "@domain/entities/projector"
import type { Room } from "@domain/entities/room"
import { AirConditionerPresenter } from "./air-conditioners-presenter"
import { ProjectorPresenter } from "./projector-presenter"
import type { RoomContext } from "@/domain/entities/value-objects/room-context"

export class RoomsPresenter {
    static toHTTP(room: Room) {
        return {
            id: room.id,
            name: room.name,
            type: room.type.toString(),
            capacity: room.capacity,
            isLocked: room.isLocked,
            updatedAt: room.updatedAt?.toISOString()
        }
    }

    static toHttpDetailed(room: Room, airConditioners: AirConditioner[], projectors: Projector[]) {
        return {
            ...this.toHTTP(room),
            airConditioners: airConditioners.map(airConditioner => {
                const formattedAirConditioner = AirConditionerPresenter.toHTTP(airConditioner)

                const { roomId, ...finalAirConditioner } = formattedAirConditioner

                return finalAirConditioner
            }),
            projectors: projectors.map(projector => {
                const formattedProjector = ProjectorPresenter.toHTTP(projector)

                const { roomId, ...finalProjector } = formattedProjector

                return finalProjector
            }),
        }
    }

    static toHttpContext(roomContext: RoomContext) {
        return {
            id: roomContext.id,
            name: roomContext.name,
            type: roomContext.type.toString(),
            capacity: roomContext.capacity,
            isLocked: roomContext.isLocked,
            updatedAt: roomContext.updatedAt?.toISOString() ?? null,
            floorId: roomContext.floorId,
            floorName: roomContext.floorName,
            buildingId: roomContext.buildingId,
            buildingName: roomContext.buildingName,
            airConditioners: roomContext.airConditioners.map(airConditioner => ({
                ...airConditioner,
                status: airConditioner.status.toString(),
                updatedAt: airConditioner.updatedAt?.toISOString() ?? null
            })),
            projectors: roomContext.projectors.map(projector => ({
                ...projector,
                status: projector.status.toString(),
                updatedAt: projector.updatedAt?.toISOString() ?? null
            }))
        }
    }

    static toSelect(room: Room) {
        return {
            id: room.id,
            name: room.name
        }
    }
}