import { AirConditionersRepository } from "../repositories/air-conditioners-repository";

interface ToggleAirConditionerUseCaseRequest {
    id: string
}

interface ToggleAirConditionerUseCaseResponse {}

export class ToggleAirConditionerUseCase {
    constructor(private airConditionersRepository: AirConditionersRepository) {}

    async execute({ id }: ToggleAirConditionerUseCaseRequest): Promise<ToggleAirConditionerUseCaseResponse> {
        const airConditioner = await this.airConditionersRepository.findById(id)

        if(!airConditioner) {
            throw new Error()
        }

        airConditioner.isOn = !airConditioner.isOn

        this.airConditionersRepository.save(airConditioner)
        
        return {}
    }
}