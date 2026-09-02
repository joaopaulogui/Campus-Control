import { randomUUID } from "node:crypto"

interface ChatParticipant {
    userId: string
    unread: number
}

export interface ChatProps {
    participants: ChatParticipant[]
}

export class Chat {
    _id: string
    private props: ChatProps

    constructor(props: ChatProps, id?: string) {
        this._id = id ?? randomUUID()
        this.props = props
    }

    get id() {
        return this._id
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