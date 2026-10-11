import { Entity } from "@core/entities/entity"

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

export interface AuditProps {
    userId?: string | null
    eventType: string
    eventEntity: EntityType
    entityId: string
    description: string
    createdAt: Date
    metadata: object
}

export class Audit extends Entity<AuditProps> {
    constructor(props: AuditProps, id?: string) {
        super(props, id)
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

    get createdAt() {
        return this.props.createdAt
    }

    get metadata() {
        return this.props.metadata
    }
}