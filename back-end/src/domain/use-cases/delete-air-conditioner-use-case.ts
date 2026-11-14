import type { AirConditionersRepository } from "../repositories/air-conditioners-repository";

interface DeleteAirConditionerUseCaseRequest {
    airConditionerId: string
}

interface DeleteAirConditionerUseCaseResponse {}

export class DeleteAirConditionerUseCase {
    constructor(private airConditionersRepository: AirConditionersRepository) {}

    async execute({ airConditionerId }: DeleteAirConditionerUseCaseRequest) {
        const airConditioner = await this.airConditionersRepository.findById(airConditionerId)

        if (!airConditioner) {
            throw new Error()
        }

        await this.airConditionersRepository.delete(airConditioner)

        return {}
    }
}