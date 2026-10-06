import { randomUUID } from "node:crypto"

export interface MessageProps {
    chatId: string
    senderId: string
    content: string
    createdAt: Date
}

export class Message {
    private _id: string
    private props: MessageProps

    constructor(props: MessageProps, id?: string) {
        this._id = id ?? randomUUID()
        this.props = props
    }

    get id() {
        return this._id
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