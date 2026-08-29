export interface ItemProps {
    id: string
    name: string
    quantity: number
}

export class Item {
    private props: ItemProps

    constructor(props: ItemProps) {
        this.props = props
    }

    get id() {
        return this.props.id
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