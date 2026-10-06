import type { AirConditioner } from "../../entities/air-conditioner"
import type { Projector } from "../../entities/projector"
import type { Room } from "../../entities/room"
import { AirConditionerPresenter } from "./air-conditioners-presenter"
import { ProjectorPresenter } from "./projector-presenter"

export class RoomsPresenter {
    static toHTTP(room: Room) {
        return {
            id: room.id,
            name: room.name,
            type: room.type.toString(),
            capacity: room.capacity,
            isLocked: room.isLocked
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
}