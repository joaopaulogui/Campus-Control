import { randomUUID } from "node:crypto"

export interface ScheduleProps {
    roomId: string
    title: string
    startDate: Date
    endDate: Date
    roomKeeper: string
    updatedAt?: Date | null
}

export class Schedule {
    private _id: string
    private props: ScheduleProps

    constructor(props: ScheduleProps, id?: string) {
        this._id = id ?? randomUUID()
        this.props = props
    }

    get id() {
        return this._id
    }

    get roomId() {
        return this.props.roomId
    }
    
    set roomId(roomId: string) {
        this.props.roomId = roomId
        this.touch()
    }

    get title() {
        return this.props.title
    }

    set title(title: string) {
        this.props.title = title
        this.touch()
    }

    get startDate() {
        return this.props.startDate
    }

    set startDate(startDate: Date) {
        this.props.startDate = startDate
        this.touch()
    }

    get endDate() {
        return this.props.endDate
    }

    set endDate(endDate: Date) {
        this.props.endDate = endDate
        this.touch()
    }

    get roomKeeper() {
        return this.props.roomKeeper
    }

    set roomKeeper(roomKeeper: string) {
        this.props.roomKeeper = roomKeeper
        this.touch()
    }

    get updatedAt() {
        return this.props.updatedAt
    }

    private touch() {
        this.props.updatedAt = new Date()
    }
}