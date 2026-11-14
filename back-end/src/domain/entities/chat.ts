import { Entity } from "@core/entities/entity"

interface ChatParticipant {
    userId: string
    chatId: string
    unread: number
}

export interface ChatProps {
    participants: ChatParticipant[]
}

export class Chat extends Entity<ChatProps> {
    constructor(props: ChatProps, id?: string) {
        super(props, id)
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