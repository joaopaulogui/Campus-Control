import { AirConditioner } from "../entities/air-conditioner"
import { AirConditionersRepository } from "../repositories/air-conditioners-repository"

interface ListAirConditionersUseCaseRequest {
    floorId?: string
}

interface ListAirConditionersUseCaseResponse {
    airConditioners: AirConditioner[]
}

export class ListAirConditionersUseCase {
    constructor(private airConditionersRepository: AirConditionersRepository) {}

    async execute({ floorId }: ListAirConditionersUseCaseRequest): Promise<ListAirConditionersUseCaseResponse> {
        const airConditioners = await this.airConditionersRepository.findMany(floorId)

        return { airConditioners, }
    }
}