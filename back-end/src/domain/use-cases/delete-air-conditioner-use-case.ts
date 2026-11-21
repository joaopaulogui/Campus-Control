import { AirConditionerDeletedEvent } from "../events/air-conditioner-deleted-event";
import type { AirConditionersRepository } from "../repositories/air-conditioners-repository";

interface DeleteAirConditionerUseCaseRequest {
    userId: string
    airConditionerId: string
}

interface DeleteAirConditionerUseCaseResponse {}

export class DeleteAirConditionerUseCase {
    constructor(private airConditionersRepository: AirConditionersRepository) {}

    async execute({ userId, airConditionerId }: DeleteAirConditionerUseCaseRequest) {
        const airConditioner = await this.airConditionersRepository.findById(airConditionerId)

        if (!airConditioner) {
            throw new Error()
        }

        airConditioner.addDomainEvent(new AirConditionerDeletedEvent(airConditioner, userId))

        await this.airConditionersRepository.delete(airConditioner)

        return {}
    }
}