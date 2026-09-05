import type { AirConditionerStatus } from "../entities/air-conditioner.js"
import type { AirConditionersRepository } from "../repositories/air-conditioners-repository.js"
import type { FloorsRepository, FloorWithRoomsAndAirConditioners } from "../repositories/floors-repository.js"
import type { RoomsRepository } from "../repositories/rooms-repository.js"

interface ListFloorsWithRoomsAndAirConditionersUseCaseRequest {
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
    ) {}

    async execute({ floorId, status }: ListFloorsWithRoomsAndAirConditionersUseCaseRequest): Promise<ListFloorsWithRoomsAndAirConditionersUseCaseResponse> {
        
        const floors = await this.floorsRepository.findMany({ id: floorId })

        const rooms = await this.roomsRepository.findMany({ floorId, })

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