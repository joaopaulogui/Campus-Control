import type { RoomProps } from "../room"
import type { AirConditionerProps } from "../air-conditioner"
import type { ProjectorProps } from "../projector"

export type RoomContext = Readonly<RoomProps & {
    id: string,
    floorName: string,
    buildingId: string,
    buildingName: string,
    airConditioners: ReadonlyArray<Readonly<Omit<AirConditionerProps, "roomId"> & { id: string }>>,
    projectors: ReadonlyArray<Readonly<Omit<ProjectorProps, "roomId"> & { id: string }>>
}>