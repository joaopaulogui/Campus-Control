import { Entity } from "./entity"

export enum ProjectorStatus {
    WORKING = "WORKING",
    WARNING = "WARNING",
    BROKEN = "BROKEN",
}

export interface ProjectorProps {
    roomId: string
    status: ProjectorStatus
    updatedAt?: Date | null
}

export class Projector extends Entity<ProjectorProps> {
    constructor(props: ProjectorProps, id?: string) {
        super(props, id)
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