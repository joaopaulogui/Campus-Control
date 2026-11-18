import type { AirConditionerProps } from "../air-conditioner";

export type AirConditionerWithRoom = Readonly<AirConditionerProps & {
    id: string,
    roomName: string
}>