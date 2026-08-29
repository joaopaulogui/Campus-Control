export interface MessageProps {
    id: string
    chatId: string
    senderId: string
    content: string
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

    get chatId() {
        return this.props.chatId
    }

    get senderId() {
        return this.props.senderId
    }

    get content() {
        return this.props.content
    }

    get createdAt() {
        return this.props.createdAt
    }
}