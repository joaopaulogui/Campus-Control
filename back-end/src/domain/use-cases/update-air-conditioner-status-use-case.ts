import type { AirConditionerStatus } from "../entities/air-conditioner"
import { AirConditionerUpdatedEvent } from "../events/air-conditioner-updated-event"
import type { AirConditionersRepository } from "../repositories/air-conditioners-repository"

interface UpdateAirConditionerStatusUseCaseRequest {
    userId: string
    airConditionerId: string
    status: AirConditionerStatus
}

interface UpdateAirConditionerStatusUseCaseResponse {}

export class UpdateAirConditionerStatusUseCase {
    constructor(private airConditionersRepository: AirConditionersRepository) {}

    async execute({ userId, airConditionerId, status }: UpdateAirConditionerStatusUseCaseRequest): Promise<UpdateAirConditionerStatusUseCaseResponse> {
        const airConditioner = await this.airConditionersRepository.findById(airConditionerId)

        if(!airConditioner) {
            throw new Error()
        }

        if(status) {
            if(airConditioner.status === status) {
                return {}
            }

            airConditioner.status = status
        }

        airConditioner.addDomainEvent(new AirConditionerUpdatedEvent(airConditioner, userId, { status, }))

        await this.airConditionersRepository.save(airConditioner)
    
        return {}
    }
}