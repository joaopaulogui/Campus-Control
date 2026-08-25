export interface FloorProps {
    id: string
    name: string 
}

export class Floor {
    private props: FloorProps

    constructor(props: FloorProps) {
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
}