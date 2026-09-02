import { randomUUID } from "node:crypto"

export interface ScheduleProps {
    roomId: string
    startDate: Date
    endDate: Date
    title: string
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
    }

    get startDate() {
        return this.props.startDate
    }

    set startDate(startDate: Date) {
        this.props.startDate = startDate
    }

    get endDate() {
        return this.props.endDate
    }

    set endDate(endDate: Date) {
        this.props.endDate = endDate
    }

    get title() {
        return this.props.title
    }

    set title(title: string) {
        this.props.title = title
    }
}