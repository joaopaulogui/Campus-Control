export enum RoomType {
    CLASSROOM,
    LAB,
    MEETING_ROOM,
    AUDITORIUM
}

export enum RoomStatus {
    LOCKED,
    UNLOCKED
}

export interface RoomProps {
    id: string
    name: string
    type: RoomType
    capacity: number
    status: RoomStatus
    floorId: string
}

export class Room {
    private props: RoomProps

    constructor(props: RoomProps) {
        this.props = props
    }

    get id() {
        return this.props.id
    }

    get name() {
        return this.props.name
    }

    set name(name: string) {
        this.props.name = name
    }

    get type() {
        return this.props.type
    }

    set type(type: RoomType) {
        this.props.type = type
    }

    get capacity() {
        return this.props.capacity
    }

    set capacity(capacity: number) {
        this.props.capacity = capacity
    }

    get status() {
        return this.props.status
    }

    set status(status: RoomStatus) {
        this.props.status = status
    }

    get floorId() {
        return this.props.floorId
    }

    set floorId(floorId: string) {
        this.props.floorId = floorId
    }
}