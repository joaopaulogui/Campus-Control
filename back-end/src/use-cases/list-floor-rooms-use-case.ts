import type { FloorWithRooms } from "../presenters/floor-with-rooms-presenter.js";
import type { FloorsRepository } from "../repositories/floors-repository.js";
import type { RoomsRepository } from "../repositories/rooms-repository.js";

interface ListFloorRoomsUseCaseRequest {
    floorId?: string | undefined
}

interface ListFloorRoomsUseCaseResponse {
    floors: FloorWithRooms[]
}

export class ListFloorRoomsUseCase {
    constructor(
        private floorsRepository: FloorsRepository,
        private roomsRepository: RoomsRepository,
    ) {}

    async execute({ floorId }: ListFloorRoomsUseCaseRequest): Promise<ListFloorRoomsUseCaseResponse> {
        const floors = floorId
            ? await this.floorsRepository.findMany({ id: floorId })
            : await this.floorsRepository.findMany()
        
        const rooms = await this.roomsRepository.findMany({ floorId, })

        const floorsWithRooms = floors.map(floor => ({
            floor,
            rooms: rooms.filter(room => room.floorId === floor.id),
        }))

        return { floors: floorsWithRooms, }
    }
}