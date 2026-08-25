import { Message } from "../entities/message";

export interface MessagesRepository {
    create(message: Message): Promise<void>
    findManyByChatId(chatId: string): Promise<Message[]>
    delete(message: Message): Promise<void>
}