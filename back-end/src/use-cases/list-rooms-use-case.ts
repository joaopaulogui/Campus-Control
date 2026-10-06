import type { Room } from "../entities/room.js";
import type { FloorsRepository } from "../repositories/floors-repository.js";
import type { RoomsRepository } from "../repositories/rooms-repository.js";

interface ListRoomsUseCaseRequest { 
    buildingId: string, 
    floorId?: string | undefined 
} 


interface ListRoomsUseCaseResponse {
    rooms: Room[]
}

export class ListRoomsUseCase {
    constructor(
        private floorsRepository: FloorsRepository,
        private roomsRepository: RoomsRepository,
    ) {}

    async execute({ buildingId, floorId }: ListRoomsUseCaseRequest): Promise<ListRoomsUseCaseResponse> {
        let floorIds: string[]

        if(floorId) {
            const floor = await this.floorsRepository.findById(floorId)

            if(!floor || floor.buildingId !== buildingId) {
                throw new Error()
            }

            floorIds = [floorId]
        } else {
            const floors = await this.floorsRepository.findMany({ buildingId, })

            floorIds = floors.map(floor => floor.id)
        }

        const rooms = await this.roomsRepository.findMany({ floorIds, })

        return { rooms, }
    }
}