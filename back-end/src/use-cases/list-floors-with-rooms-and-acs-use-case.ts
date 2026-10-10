import type { AirConditionerStatus } from "../entities/air-conditioner.js"
import type { FloorWithRoomsAndAirConditioners } from "../entities/value-objects/floor-with-rooms-and-air-conditioners.js"
import type { AirConditionersRepository } from "../repositories/air-conditioners-repository.js"
import type { BuildingsRepository } from "../repositories/buildings-repository.js"
import type { FloorsRepository } from "../repositories/floors-repository.js"
import type { RoomsRepository } from "../repositories/rooms-repository.js"

interface ListFloorsWithRoomsAndAirConditionersUseCaseRequest {
    buildingId: string
    floorId?: string | undefined
    status?: AirConditionerStatus | undefined
}

interface ListFloorsWithRoomsAndAirConditionersUseCaseResponse {
    floorsWithRoomsAndAirConditioners: FloorWithRoomsAndAirConditioners[]
}

export class ListFloorsWithRoomsAndAirConditionersUseCase {
    constructor(
        private airConditionersRepository: AirConditionersRepository,
        private roomsRepository: RoomsRepository,
        private floorsRepository: FloorsRepository,
        private buildingsRepository: BuildingsRepository,
    ) {}

    async execute({ buildingId, floorId, status }: ListFloorsWithRoomsAndAirConditionersUseCaseRequest): Promise<ListFloorsWithRoomsAndAirConditionersUseCaseResponse> {
        const building = await this.buildingsRepository.findById(buildingId)

        if(!building) {
            throw new Error()
        }

        const floors = await this.floorsRepository.findMany({ buildingId, id: floorId })

        const floorIds = floors.map(floor => floor.id)

        const rooms = await this.roomsRepository.findMany({ floorIds, })

        const roomIds = rooms.map((room) => room.id)

        const airConditioners = await this.airConditionersRepository.findMany({ roomIds, status, })

        const groupedFloors = floors.map(floor => ({
            floor,
            rooms: rooms.filter(room => room.floorId === floor.id).map((room) => ({
                room,
                airConditioners: airConditioners.filter(airConditioner => airConditioner.roomId === room.id)
            }))
        }))

        return { floorsWithRoomsAndAirConditioners: groupedFloors, }
    }
}