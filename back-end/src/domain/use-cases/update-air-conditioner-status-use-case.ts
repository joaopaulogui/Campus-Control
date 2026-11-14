import type { AirConditionerStatus } from "../entities/air-conditioner"
import type { AirConditionersRepository } from "../repositories/air-conditioners-repository"

interface UpdateAirConditionerStatusUseCaseRequest {
    airConditionerId: string
    status?: AirConditionerStatus | undefined
}

interface UpdateAirConditionerStatusUseCaseResponse {}

export class UpdateAirConditionerStatusUseCase {
    constructor(private airConditionersRepository: AirConditionersRepository) {}

    async execute({ airConditionerId, status }: UpdateAirConditionerStatusUseCaseRequest): Promise<UpdateAirConditionerStatusUseCaseResponse> {
        const airConditioner = await this.airConditionersRepository.findById(airConditionerId)

        if(!airConditioner) {
            throw new Error()
        }

        if(status) {
            airConditioner.status = status
        }

        await this.airConditionersRepository.save(airConditioner)
    
        return {}
    }
}