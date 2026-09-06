import { randomUUID } from "node:crypto"

export interface BuildingProps {
    name: string
    updatedAt?: Date | null
}

export class Building {
    private _id: string
    private props: BuildingProps

    constructor(props: BuildingProps, id?: string) {
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

    get updatedAt() {
        return this.props.updatedAt
    }

    private touch() {
        this.props.updatedAt = new Date()
    }
}