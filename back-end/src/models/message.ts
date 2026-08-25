export interface MessageProps {
    id: string
    senderId: string
    text: string
    createdAt: Date
}

export class Message {
    private props: MessageProps

    constructor(props: MessageProps) {
        this.props = props
    }

    get id() {
        return this.props.id
    }

    get senderId() {
        return this.props.senderId
    }

    get text() {
        return this.props.text
    }

    get createdAt() {
        return this.props.createdAt
    }
}