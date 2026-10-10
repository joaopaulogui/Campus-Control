import type { Room, RoomType } from "../entities/room.js";
import type { FloorsRepository } from "../repositories/floors-repository.js";
import type { RoomsRepository } from "../repositories/rooms-repository.js";

interface ListRoomsUseCaseRequest { 
    buildingId: string, 
    floorId?: string | undefined 
    name?: string | undefined
    type?: RoomType | undefined
    isLocked?: boolean | undefined
    page?: number | undefined
    perPage?: number | undefined
} 


interface ListRoomsUseCaseResponse {
    rooms: Room[]
}

export class ListRoomsUseCase {
    constructor(
        private floorsRepository: FloorsRepository,
        private roomsRepository: RoomsRepository,
    ) {}

    async execute({ buildingId, floorId, name, type, isLocked, page, perPage }: ListRoomsUseCaseRequest): Promise<ListRoomsUseCaseResponse> {
        if(!page) { page = 1 }
        if(!perPage) { perPage = 30 }
        
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

        const rooms = await this.roomsRepository.findManyPaginated({ floorIds, name, type, isLocked }, { page, perPage })

        return { rooms, }
    }
}