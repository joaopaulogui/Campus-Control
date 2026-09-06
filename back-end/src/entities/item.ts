import { randomUUID } from "node:crypto"

export enum ItemTypes {
    EQUIPMENT = "EQUIPMENT",
    STATIONARY = "STATIONARY",
    OTHER = "OTHER",
}

export interface ItemProps {
    name: string
    type: ItemTypes
    totalQuantity: number
    availableQuantity: number
    updatedAt?: Date | null
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
        this.touch()
    }
    
    get totalQuantity() {
        return this.props.totalQuantity
    }

    set totalQuantity(totalQuantity: number) {
        this.props.totalQuantity = totalQuantity
        this.touch()
    }

    get availableQuantity() {
        return this.props.availableQuantity
    }

    set availableQuantity(availableQuantity: number) {
        this.props.availableQuantity = availableQuantity
        this.touch()
    }

    get updatedAt() {
        return this.props.updatedAt
    }
    
    private touch() {
        this.props.updatedAt = new Date()
    }
}