import { Room, type RoomType } from "../entities/room";
import type { FloorsRepository } from "../repositories/floors-repository";
import type { RoomsRepository } from "../repositories/rooms-repository";

interface CreateRoomUseCaseRequest {
    name: string,
    type: RoomType,
    capacity: number,
    floorId: string,
}

interface CreateRoomUseCaseResponse {}

export class CreateRoomUseCase {
    constructor(
        private roomsRepository: RoomsRepository,
        private floorsRepository: FloorsRepository,
    ) {}

    async execute({
        name, 
        type, 
        capacity, 
        floorId, 
    }: CreateRoomUseCaseRequest): Promise<CreateRoomUseCaseResponse> {
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

        await this.roomsRepository.create(room)
        
        return {}
    }
}