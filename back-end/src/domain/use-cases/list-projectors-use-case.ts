import type { Projector, ProjectorStatus } from "../entities/projector"
import type { ProjectorsRepository } from "../repositories/projectors-repository"
import type { BuildingsRepository } from "../repositories/buildings-repository"
import type { FloorsRepository } from "../repositories/floors-repository"
import type { RoomsRepository } from "../repositories/rooms-repository"

interface ListProjectorsUseCaseRequest {
    buildingId: string
    floorId?: string | undefined
    status?: ProjectorStatus | undefined
}

interface ListProjectorsUseCaseResponse {
    projectors: Projector[]
}

export class ListProjectorsUseCase {
    constructor(
        private projectorsRepository: ProjectorsRepository,
        private roomsRepository: RoomsRepository,
        private floorsRepository: FloorsRepository,
        private buildingsRepository: BuildingsRepository,
    ) {}

    async execute({ buildingId, floorId, status }: ListProjectorsUseCaseRequest): Promise<ListProjectorsUseCaseResponse> {
        const building = await this.buildingsRepository.findById(buildingId)

        if(!building) {
            throw new Error()
        }

        const floors = await this.floorsRepository.findMany({ buildingId, id: floorId })

        const floorIds = floors.map(floor => floor.id)

        const rooms = await this.roomsRepository.findMany({ floorIds, })

        const roomIds = rooms.map((room) => room.id)

        const projectors = await this.projectorsRepository.findMany({ roomIds, status, })

        return { projectors, }
    }
}