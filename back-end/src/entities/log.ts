import { randomUUID } from "node:crypto"

export enum EntityType {
    BUILDING = "BUILDING",
    FLOOR = "FLOOR",
    ROOM = "ROOM",
    AIR_CONDITIONER = "AIR_CONDITIONER",
    PROJECTOR ="PROJECTOR",
    SCHEDULE = "SCHEDULE",
    ITEM = "ITEM",
    LOAN = "LOAN",
    USER = "USER"
}

export interface LogProps {
    userId?: string | null
    eventType: string
    eventEntity: EntityType
    entityId: string
    description: string
    metadata: object
}

export class Log {
    private _id: string
    private props: LogProps

    constructor(props: LogProps, id?: string) {
        this._id = id ?? randomUUID()
        this.props = props
    }

    get id() {
        return this._id
    }

    get userId() {
        return this.props.userId
    }

    get eventType() {
        return this.props.eventType
    }

    get eventEntity() {
        return this.props.eventEntity
    }

    get entityId() {
        return this.props.entityId
    }

    get description() {
        return this.props.description
    }

    get metadata() {
        return this.props.metadata
    }
}