import type { Floor } from "../entities/floor.js";
import type { Room } from "../entities/room.js";
import type { FloorsRepository } from "../repositories/floors-repository.js";
import type { RoomsRepository } from "../repositories/rooms-repository.js";

interface FloorWithRooms {
    floor: Floor
    rooms: Room[]
}

interface ListFloorRoomsUseCaseRequest {
    floorId?: string
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