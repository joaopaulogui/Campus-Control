import type { RoomType } from "../entities/room"
import type { RoomsRepository } from "../repositories/rooms-repository"

interface UpdateRoomUseCaseRequest {
    roomId: string
    name?: string | undefined
    type?: RoomType | undefined
    capacity?: number | undefined
}

interface UpdateRoomUseCaseResponse {}

export class UpdateRoomUseCase {
    constructor(private roomsRepository: RoomsRepository) {}

    async execute({ roomId, name, type, capacity }: UpdateRoomUseCaseRequest): Promise<UpdateRoomUseCaseResponse> {
        const room = await this.roomsRepository.findById(roomId)

        if(!room) {
            throw new Error()
        }

        if(name) {
            room.name = name
        }

        if(type) {
            room.type = type
        }

        if(capacity) {
            room.capacity = capacity
        }

        await this.roomsRepository.save(room)
    
        return {}
    }
}