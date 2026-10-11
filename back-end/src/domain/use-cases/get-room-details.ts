import type { AirConditioner } from "../entities/air-conditioner"
import type { Projector } from "../entities/projector"
import type { Room } from "../entities/room"
import type { AirConditionersRepository } from "../repositories/air-conditioners-repository"
import type { ProjectorsRepository } from "../repositories/projectors-repository"
import type { RoomsRepository } from "../repositories/rooms-repository"

interface GetRoomDetailsUseCaseRequest {
    roomId: string
}

interface GetRoomDetailsUseCaseResponse {
    room: Room
    airConditioners: AirConditioner[]
    projectors: Projector[]
}

export class GetRoomDetailsUseCase {
    constructor(
        private roomsRepository: RoomsRepository,
        private airConditionersRepository: AirConditionersRepository,
        private projectorsRepository: ProjectorsRepository,
    ) {}

    async execute({ roomId }: GetRoomDetailsUseCaseRequest): Promise<GetRoomDetailsUseCaseResponse> {
        const room = await this.roomsRepository.findById(roomId)
        
        if(!room) {
            throw new Error()
        }

        const airConditioners = await this.airConditionersRepository.findMany({ roomIds: [roomId] })

        const projectors = await this.projectorsRepository.findMany({ roomIds: [roomId] })

        return {
            room,
            airConditioners,
            projectors,
         }
    }
}