import { Entity } from "./entity"

export enum AirConditionerStatus {
    WORKING = "WORKING",
    WARNING = "WARNING",
    BROKEN = "BROKEN",
}

export interface AirConditionerProps {
    status: AirConditionerStatus
    temperature: number
    isOn: boolean
    roomId: string
    updatedAt?: Date | null
}

export class AirConditioner extends Entity<AirConditionerProps> {
    constructor(props: AirConditionerProps, id?: string) {
        super(props, id)
    }

    get status() {
        return this.props.status
    }

    set status(status: AirConditionerStatus) {
        this.props.status = status
        this.touch()
    }

    get temperature() {
        return this.props.temperature
    }

    set temperature(temperature: number) {
        this.props.temperature = temperature
        this.touch()
    }

    get isOn() {
        return this.props.isOn
    }

    set isOn(isOn: boolean) {
        this.props.isOn = isOn
        this.touch()
    }

    get roomId() {
        return this.props.roomId
    }

    set roomId(roomId: string) {
        this.props.roomId = roomId
        this.touch()
    }

    get updatedAt() {
        return this.props.updatedAt
    }

    private touch() {
        this.props.updatedAt = new Date()
    }
}