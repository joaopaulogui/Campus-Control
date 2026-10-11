import { Message } from "../entities/message.js";

export interface MessagesRepository {
    create(message: Message): Promise<void>
    findManyByChatId(chatId: string): Promise<Message[]>
    delete(message: Message): Promise<void>
}