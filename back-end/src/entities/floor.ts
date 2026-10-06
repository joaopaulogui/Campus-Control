import { randomUUID } from "node:crypto"

export interface FloorProps {
    name: string 
    buildingId: string
    updatedAt?: Date | null
}

export class Floor {
    private _id
    private props: FloorProps

    constructor(props: FloorProps, id?: string) {
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
        this.touch()
    }

    get buildingId() {
        return this.props.buildingId
    }

    set buildingId(buildingId: string) {
        this.props.buildingId = buildingId
    }

    get updatedAt() {
        return this.props.updatedAt
    }
    
    private touch() {
        this.props.updatedAt = new Date()
    }
}