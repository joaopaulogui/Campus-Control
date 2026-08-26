import { Room } from "../entities/room";
import { RoomsRepository } from "../repositories/rooms-repository";

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