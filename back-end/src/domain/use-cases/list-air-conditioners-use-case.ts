import type { AirConditioner, AirConditionerStatus } from "../entities/air-conditioner.js"
import type { AirConditionersRepository } from "../repositories/air-conditioners-repository.js"
import type { BuildingsRepository } from "../repositories/buildings-repository.js"
import type { FloorsRepository } from "../repositories/floors-repository.js"
import type { RoomsRepository } from "../repositories/rooms-repository.js"

interface ListAirConditionersUseCaseRequest {
    buildingId: string
    floorId?: string | undefined
    status?: AirConditionerStatus | undefined
}

interface ListAirConditionersUseCaseResponse {
    airConditioners: AirConditioner[]
}

export class ListAirConditionersUseCase {
    constructor(
        private airConditionersRepository: AirConditionersRepository,
        private roomsRepository: RoomsRepository,
        private floorsRepository: FloorsRepository,
        private buildingsRepository: BuildingsRepository,
    ) {}

    async execute({ buildingId, floorId, status }: ListAirConditionersUseCaseRequest): Promise<ListAirConditionersUseCaseResponse> {
        const building = await this.buildingsRepository.findById(buildingId)

        if(!building) {
            throw new Error()
        }

        const floors = await this.floorsRepository.findMany({ buildingId, id: floorId })

        const floorIds = floors.map(floor => floor.id)

        const rooms = await this.roomsRepository.findMany({ floorIds, })

        const roomIds = rooms.map((room) => room.id)

        const airConditioners = await this.airConditionersRepository.findMany({ roomIds, status, })

        return { airConditioners, }
    }
}