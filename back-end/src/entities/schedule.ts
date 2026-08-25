export interface ScheduleProps {
    id: string
    roomId: string
    date: Date
    startHour: number
    endHour: number
    title: string
}

export class Schedule {
    private props: ScheduleProps

    constructor(props: ScheduleProps) {
        this.props = props
    }

    get id() {
        return this.props.id
    }

    get roomId() {
        return this.props.roomId
    }
    
    set roomId(roomId: string) {
        this.props.roomId = roomId
    }

    get date() {
        return this.props.date
    }

    set date(date: Date) {
        this.props.date = date
    }

    get startHour() {
        return this.props.startHour
    }

    set startHour(startHour: number) {
        this.props.startHour = startHour
    }

    get endHour() {
        return this.props.endHour
    }

    set endHour(endHour: number) {
        this.props.endHour = endHour
    }

    get title() {
        return this.props.title
    }

    set title(title: string) {
        this.props.title = title
    }
}