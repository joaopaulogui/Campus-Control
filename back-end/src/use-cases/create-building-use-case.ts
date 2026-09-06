import { Building } from "../entities/building";
import type { BuildingsRepository } from "../repositories/buildings-repository";

interface CreateBuildingUseCaseRequest {
    name: string
}

interface CreateBuildingUseCaseResponse {}

export class CreateBuildingUseCase {
    constructor(private buildingsRepository: BuildingsRepository) {}

    async execute({ name }: CreateBuildingUseCaseRequest): Promise<CreateBuildingUseCaseResponse> {
        const building = new Building({ name, })
        
        await this.buildingsRepository.create( building )
        
        return {}
    }
}