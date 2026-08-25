export enum AirConditionerStatus {
    WORKING,
    WARNING,
    BROKEN
}

export interface AirConditionerProps {
    id: string
    status: AirConditionerStatus
    temperature: number
    isOn: boolean
    roomId: string
}

export class AirConditioner {
    private props: AirConditionerProps

    constructor(props: AirConditionerProps) {
        this.props = props
    }

    get id() {
        return this.props.id
    }

    get status() {
        return this.props.status
    }

    set status(status: AirConditionerStatus) {
        this.props.status = status
    }

    get temperature() {
        return this.props.temperature
    }

    set temperature(temperature: number) {
        this.props.temperature = temperature
    }

    get isOn() {
        return this.props.isOn
    }

    set isOn(isOn: boolean) {
        this.props.isOn = isOn
    }

    get roomId() {
        return this.props.roomId
    }

    set roomId(roomId: string) {
        this.props.roomId = roomId
    }
}