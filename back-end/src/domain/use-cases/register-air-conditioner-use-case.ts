import { AirConditioner, AirConditionerStatus } from "../entities/air-conditioner"
import { AirConditionerRegisteredEvent } from "../events/air-conditioner-registered-event"
import type { AirConditionersRepository } from "../repositories/air-conditioners-repository"
import type { RoomsRepository } from "../repositories/rooms-repository"

interface RegisterAirConditionerUseCaseRequest {
    userId: string
    roomId: string
}

interface RegisterAirConditionerUseCaseResponse {}

export class RegisterAirConditionerUseCase {
    constructor(
        private roomsRepository: RoomsRepository,
        private airConditionersRepository: AirConditionersRepository
    ) {}

    async execute({ userId, roomId }: RegisterAirConditionerUseCaseRequest): Promise<RegisterAirConditionerUseCaseResponse> {
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

        airConditioner.addDomainEvent(new AirConditionerRegisteredEvent(airConditioner, userId))

        await this.airConditionersRepository.create(airConditioner)
        
        return {}
    }
}