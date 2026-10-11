import { Building } from "../entities/building";
import { BuildingRegisteredEvent } from "../events/building-registered";
import type { BuildingsRepository } from "../repositories/buildings-repository";

interface RegisterBuildingUseCaseRequest {
    userId: string
    name: string
}

interface RegisterBuildingUseCaseResponse {}

export class RegisterBuildingUseCase {
    constructor(private buildingsRepository: BuildingsRepository) {}

    async execute({ name, userId }: RegisterBuildingUseCaseRequest): Promise<RegisterBuildingUseCaseResponse> {
        const building = new Building({ name, })
        
        building.addDomainEvent(new BuildingRegisteredEvent(building, userId))

        await this.buildingsRepository.create( building )
        
        return {}
    }
}