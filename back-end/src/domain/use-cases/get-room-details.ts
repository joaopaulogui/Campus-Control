import { UserRole } from "../entities/user"
import type { RoomContext } from "../entities/value-objects/room-context"
import type { RoomsRepository } from "../repositories/rooms-repository"
import type { UsersRepository } from "../repositories/users-repositoy"

interface GetRoomDetailsUseCaseRequest {
    userId: string
    roomId: string
}

interface GetRoomDetailsUseCaseResponse {
    room: RoomContext
}

export class GetRoomDetailsUseCase {
    constructor(
        private roomsRepository: RoomsRepository,
        private usersRepository: UsersRepository,
    ) {}

    async execute({ userId, roomId }: GetRoomDetailsUseCaseRequest): Promise<GetRoomDetailsUseCaseResponse> {
        const user = await this.usersRepository.findById(userId)
        
        if(!user) {
            throw new Error()
        }

        const room = await this.roomsRepository.findByIdWithContext(roomId)
        
        if(!room) {
            throw new Error()
        }
        
        if(user.role !== UserRole.ADMIN && !user.buildingIds.includes(room.buildingId)) {
            throw new Error()
        }

        return {
            room,
         }
    }
}