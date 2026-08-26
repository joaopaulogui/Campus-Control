import { Chat } from "../entities/chat";
import { ChatsRepository } from "../repositories/chats-repository";

interface ListUserChatsUseCaseRequest {
    userId: string
}

interface ListUserChatsUseCaseResponse {
    chats: Chat[]
}

export class ListUserChatsUseCase {
    constructor(private chatsRepository: ChatsRepository) {}

    async execute({ userId }: ListUserChatsUseCaseRequest): Promise<ListUserChatsUseCaseResponse> {
        const chats = await this.chatsRepository.findManyByUserId(userId)

        return { chats, }
    }
}