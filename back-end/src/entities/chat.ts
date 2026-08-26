interface ChatParticipant {
    userId: string
    unread: number
}

export interface ChatProps {
    id: string
    participants: ChatParticipant[]
}

export class Chat {
    private props: ChatProps

    constructor(props: ChatProps) {
        this.props = props
    }

    get id() {
        return this.props.id
    }

    get participantIds() {
        return this.props.participants.map(participant => participant.userId)
    }

    hasParticipant(participantId: string): boolean {
        return this.props.participants.some(participant => participant.userId === participantId)
    }

    unreadFor(participantId: string): number {
        const participant = this.props.participants.find(participant => participant.userId === participantId)

        if(!participant) {
            throw new Error()
        }

        return participant.unread
    }
}