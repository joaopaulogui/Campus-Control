import type { RoomsRepository } from "../repositories/rooms-repository";

interface DeleteRoomUseCaseRequest {
    roomId: string
}

interface DeleteRoomUseCaseResponse {}

export class DeleteRoomUseCase {
    constructor(private roomsRepository: RoomsRepository) {}

    async execute({ roomId }: DeleteRoomUseCaseRequest): Promise<DeleteRoomUseCaseResponse> {
        const room = await this.roomsRepository.findById(roomId)

        if (!room) {
            throw new Error()
        }

        await this.roomsRepository.delete(room)

        return {}
    }
}