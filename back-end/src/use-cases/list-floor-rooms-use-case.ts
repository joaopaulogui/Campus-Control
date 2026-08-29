import type { Room } from "../entities/room.js";
import type { RoomsRepository } from "../repositories/rooms-repository.js";

interface ListFloorRoomsUseCaseRequest {
    floorId: string
}

interface ListFloorRoomsUseCaseResponse {
    rooms: Room[]
}

export class ListFloorRoomsUseCase {
    constructor(private roomsRepository: RoomsRepository) {}

    async execute({ floorId }: ListFloorRoomsUseCaseRequest): Promise<ListFloorRoomsUseCaseResponse> {
        const rooms = await this.roomsRepository.findManyByFloorId(floorId)

        return { rooms, }
    }
}