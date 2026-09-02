import { randomUUID } from "node:crypto"

export interface ItemProps {
    name: string
    quantity: number
}

export class Item {
    private _id: string
    private props: ItemProps

    constructor(props: ItemProps, id?: string) {
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

    get quantity() {
        return this.props.quantity
    }

    set quantity(quantity: number) {
        this.props.quantity = quantity
    }
}