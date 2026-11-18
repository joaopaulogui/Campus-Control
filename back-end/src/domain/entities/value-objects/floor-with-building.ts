import type { FloorProps } from "../floor"

export type FloorWithBuilding = Readonly<FloorProps & {
    id: string
    buildingName: string
}>