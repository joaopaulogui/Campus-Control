import { randomUUID } from "node:crypto"

export enum ProjectorStatus {
    WORKING = "WORKING",
    WARNING = "WARNING",
    BROKEN = "BROKEN",
}

export interface ProjectorProps {
    name: string
    roomId: string
    status: ProjectorStatus
    updatedAt?: Date | null
}

export class Projector {
    private _id: string
    private props: ProjectorProps

    constructor(props: ProjectorProps, id?: string) {
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

    get status() {
        return this.props.status
    }

    set status(status: ProjectorStatus) {
        this.props.status = status
        this.touch()
    }

    get updatedAt() {
        return this.props.updatedAt
    }

    private touch() {
        this.props.updatedAt = new Date()
    }
}