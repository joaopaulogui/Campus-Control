import { RoomDeletedEvent } from "../events/room-deleted-event";
import type { RoomsRepository } from "../repositories/rooms-repository";

interface DeleteRoomUseCaseRequest {
    userId: string
    roomId: string
}

interface DeleteRoomUseCaseResponse {}

export class DeleteRoomUseCase {
    constructor(private roomsRepository: RoomsRepository) {}

    async execute({ userId, roomId }: DeleteRoomUseCaseRequest): Promise<DeleteRoomUseCaseResponse> {
        const room = await this.roomsRepository.findById(roomId)

        if (!room) {
            throw new Error()
        }

        room.addDomainEvent(new RoomDeletedEvent(room, userId))

        await this.roomsRepository.delete(room)

        return {}
    }
}