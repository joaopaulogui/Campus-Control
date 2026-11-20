import type { RoomType } from "../entities/room"
import { RoomUpdatedEvent } from "../events/room-updated-event"
import type { RoomsRepository } from "../repositories/rooms-repository"

interface UpdateRoomUseCaseRequest {
    userId: string
    roomId: string
    name?: string | undefined
    type?: RoomType | undefined
    capacity?: number | undefined
}

interface UpdateRoomUseCaseResponse {}

export class UpdateRoomUseCase {
    constructor(private roomsRepository: RoomsRepository) {}

    async execute({ userId, roomId, name, type, capacity }: UpdateRoomUseCaseRequest): Promise<UpdateRoomUseCaseResponse> {
        const room = await this.roomsRepository.findById(roomId)

        if(!room) {
            throw new Error()
        }

        let updatedData: Record<string, any> = {}

        if(name && name !== room.name) {
            room.name = name
            updatedData.name = name
        }

        if(type && type !== room.type) {
            room.type = type
            updatedData.type = type
        }

        if(capacity && capacity !== room.capacity) {
            room.capacity = capacity
            updatedData.capacity = capacity
        }

        if(Object.keys(updatedData).length === 0) {
            return {}
        }

        room.addDomainEvent(new RoomUpdatedEvent(room, userId, updatedData))

        await this.roomsRepository.save(room)
    
        return {}
    }
}