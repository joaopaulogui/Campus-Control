import { Projector, ProjectorStatus } from "../entities/projector"
import type { ProjectorsRepository } from "../repositories/projectors-repository"
import type { RoomsRepository } from "../repositories/rooms-repository"

interface RegisterProjectorUseCaseRequest {
    roomId: string
}

interface RegisterProjectorUseCaseResponse {}

export class RegisterProjectorUseCase {
    constructor(
        private projectorsRepository: ProjectorsRepository,
        private roomsRepository: RoomsRepository
    ) {}

    async execute({ roomId }: RegisterProjectorUseCaseRequest): Promise<RegisterProjectorUseCaseResponse> {
        const room = await this.roomsRepository.findById(roomId)

        if(!room) {
            throw new Error()
        }

        const projector = new Projector({
            roomId,
            status: ProjectorStatus.WORKING,
        })

        await this.projectorsRepository.create(projector)

        return {}
    }
}