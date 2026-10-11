import { Entity } from "@core/entities/entity"

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
    updatedAt?: Date | null
}

export class Room extends Entity<RoomProps> {
    constructor(props: RoomProps, id?: string) {
        super(props, id)
    }

    get name() {
        return this.props.name
    }

    set name(name: string) {
        this.props.name = name
        this.touch()
    }

    get type() {
        return this.props.type
    }

    set type(type: RoomType) {
        this.props.type = type
        this.touch()
    }

    get capacity() {
        return this.props.capacity
    }

    set capacity(capacity: number) {
        this.props.capacity = capacity
        this.touch()
    }

    get isLocked() {
        return this.props.isLocked
    }

    set isLocked(isLocked: boolean) {
        this.props.isLocked = isLocked
        this.touch()
    }

    get floorId() {
        return this.props.floorId
    }

    set floorId(floorId: string) {
        this.props.floorId = floorId
        this.touch()
    }

    get updatedAt() {
        return this.props.updatedAt
    }

    private touch() {
        this.props.updatedAt = new Date()
    }
}