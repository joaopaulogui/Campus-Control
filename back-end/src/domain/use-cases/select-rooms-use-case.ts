import type { Room, RoomType } from "../entities/room.js";
import { UserRole } from "../entities/user.js";
import type { RoomsRepository } from "../repositories/rooms-repository.js";
import type { UsersRepository } from "../repositories/users-repositoy.js";

interface SelectRoomsUseCaseRequest {
    userId: string
    buildingId?: string | undefined
    floorId?: string | undefined 
    name?: string | undefined
    type?: RoomType | undefined
    isLocked?: boolean | undefined
    page?: number | undefined
    perPage?: number | undefined
} 


interface SelectRoomsUseCaseResponse {
    rooms: Room[]
}

export class SelectRoomsUseCase {
    constructor(
        private roomsRepository: RoomsRepository,
        private usersRepository: UsersRepository,
    ) {}

    async execute({ userId, buildingId, floorId, name, type, isLocked, page = 1, perPage = 30 }: SelectRoomsUseCaseRequest): Promise<SelectRoomsUseCaseResponse> {      
        const user = await this.usersRepository.findById(userId)

        if(!user) {
            throw new Error()
        }
        
        let buildingIds: string[] | undefined
        
        if(user.role === UserRole.ADMIN) {
            buildingIds = buildingId ? [buildingId] : undefined
        } else {    
            if(buildingId) {
                if(!user.buildingIds.includes(buildingId)) {
                    buildingIds = []    
                }
                    
                buildingIds = [buildingId]    
            } else {
                buildingIds = user.buildingIds
            }
        }

        const rooms = await this.roomsRepository.findManyPaginated({ 
            buildingIds,
            floorIds: floorId ? [floorId] : undefined, 
            name, 
            type, 
            isLocked 
        }, { page, perPage })

        return { rooms, }
    }
}