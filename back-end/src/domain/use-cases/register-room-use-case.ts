import { Room, type RoomType } from "../entities/room";
import { RoomRegisteredEvent } from "../events/room-registered-event";
import type { FloorsRepository } from "../repositories/floors-repository";
import type { RoomsRepository } from "../repositories/rooms-repository";

interface RegisterRoomUseCaseRequest {
    userId: string,
    name: string,
    type: RoomType,
    capacity: number,
    floorId: string,
}

interface RegisterRoomUseCaseResponse {}

export class RegisterRoomUseCase {
    constructor(
        private roomsRepository: RoomsRepository,
        private floorsRepository: FloorsRepository,
    ) {}

    async execute({
        userId,
        name, 
        type, 
        capacity, 
        floorId, 
    }: RegisterRoomUseCaseRequest): Promise<RegisterRoomUseCaseResponse> {
        const floor = await this.floorsRepository.findById(floorId)

        if(!floor) {
            throw new Error()
        }

        const room = new Room({
            name,
            type,
            capacity,
            floorId,
            isLocked: false,
        })

        room.addDomainEvent(new RoomRegisteredEvent(room, userId))

        await this.roomsRepository.create(room)
        
        return {}
    }
}