import { Building } from "../entities/building";
import type { BuildingsRepository } from "../repositories/buildings-repository";

interface RegisterBuildingUseCaseRequest {
    name: string
}

interface RegisterBuildingUseCaseResponse {}

export class RegisterBuildingUseCase {
    constructor(private buildingsRepository: BuildingsRepository) {}

    async execute({ name }: RegisterBuildingUseCaseRequest): Promise<RegisterBuildingUseCaseResponse> {
        const building = new Building({ name, })
        
        await this.buildingsRepository.create( building )
        
        return {}
    }
}