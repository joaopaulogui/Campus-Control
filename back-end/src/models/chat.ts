export interface ChatProps {
    id: string
    participantId: string
    unread: number
}

export class Chat {
    private props: ChatProps

    constructor(props: ChatProps) {
        this.props = props
    }

    get id() {
        return this.props.id
    }

    get participantId() {
        return this.props.participantId
    }

    get unread() {
        return this.props.unread
    }

    set unread(unread: number) {
        this.props.unread = unread
    }
}