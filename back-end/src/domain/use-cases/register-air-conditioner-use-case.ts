import { AirConditioner, AirConditionerStatus } from "../entities/air-conditioner"
import type { AirConditionersRepository } from "../repositories/air-conditioners-repository"
import type { RoomsRepository } from "../repositories/rooms-repository"

interface RegisterAirConditionerUseCaseRequest {
    roomId: string
}

interface RegisterAirConditionerUseCaseResponse {}

export class RegisterAirConditionerUseCase {
    constructor(
        private roomsRepository: RoomsRepository,
        private airConditionersRepository: AirConditionersRepository
    ) {}

    async execute({ roomId }: RegisterAirConditionerUseCaseRequest): Promise<RegisterAirConditionerUseCaseResponse> {
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