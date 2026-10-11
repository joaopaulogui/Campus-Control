import { Entity } from "@core/entities/entity"

export interface MessageProps {
    chatId: string
    senderId: string
    content: string
    createdAt: Date
}

export class Message extends Entity<MessageProps> {
    constructor(props: MessageProps, id?: string) {
        super(props, id)
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