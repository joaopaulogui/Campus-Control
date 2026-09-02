import { randomUUID } from "node:crypto"

export interface FloorProps {
    name: string 
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
    }
}