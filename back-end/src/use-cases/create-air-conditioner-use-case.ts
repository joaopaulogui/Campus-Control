import { AirConditioner, AirConditionerStatus } from "../entities/air-conditioner"
import type { AirConditionersRepository } from "../repositories/air-conditioners-repository"
import type { RoomsRepository } from "../repositories/rooms-repository"

interface CreateAirConditionerUseCaseRequest {
    roomId: string
}

interface CreateAirConditionerUseCaseResponse {}

export class CreateAirConditionerUseCase {
    constructor(
        private roomsRepository: RoomsRepository,
        private airConditionersRepository: AirConditionersRepository
    ) {}

    async execute({ roomId }: CreateAirConditionerUseCaseRequest): Promise<CreateAirConditionerUseCaseResponse> {
        const room = await this.roomsRepository.findById(roomId)

        if(!room) {
            throw new Error()
        }

        const airConditioner = new AirConditioner({
            roomId,
            status: AirConditionerStatus.WORKING,
            temperature: 20,
            isOn: false
        })

        await this.airConditionersRepository.create(airConditioner)
        
        return {}
    }
}