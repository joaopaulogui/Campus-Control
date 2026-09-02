import { randomUUID } from "node:crypto"

export enum RoomType {
    CLASSROOM = "CLASSROOM",
    LAB = "LAB",
    MEETING_ROOM = "MEETING_ROOM",
    AUDITORIUM = "AUDITORIUM",
}

export interface RoomProps {
    name: string
    type: RoomType
    capacity: number
    isLocked: boolean
    floorId: string
}

export class Room {
    private _id: string
    private props: RoomProps

    constructor(props: RoomProps, id?: string) {
        this._id = id ?? randomUUID()
        this.props = props
    }

    get id() {
        return this._id
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

    get isLocked() {
        return this.props.isLocked
    }

    set isLocked(isLocked: boolean) {
        this.props.isLocked = isLocked
    }

    get floorId() {
        return this.props.floorId
    }

    set floorId(floorId: string) {
        this.props.floorId = floorId
    }
}