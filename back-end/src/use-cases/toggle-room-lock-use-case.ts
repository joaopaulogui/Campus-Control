import type { RoomsRepository } from "../repositories/rooms-repository";

interface ToggleRoomLockUseCaseRequest {
    roomId: string
}

interface ToggleRoomLockUseCaseResponse {}

export class ToggleRoomLockUseCase {
    constructor(private roomsRepository: RoomsRepository) {}

    async execute({ roomId }: ToggleRoomLockUseCaseRequest): Promise<ToggleRoomLockUseCaseResponse> {
        const room = await this.roomsRepository.findById(roomId)

        if(!room) {
            throw new Error()
        }

        room.isLocked = !room.isLocked

        await this.roomsRepository.save(room)

        return {}
    }
}