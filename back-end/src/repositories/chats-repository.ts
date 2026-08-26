import { Chat } from "../entities/chat.js";

export interface ChatsRepository {
    create(chat: Chat): Promise<void>
    findManyByUserId(userId: string): Promise<Chat[]>
    delete(chat: Chat): Promise<void>
}
