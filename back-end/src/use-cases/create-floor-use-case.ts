import { Floor } from "../entities/floor";
import type { BuildingsRepository } from "../repositories/buildings-repository";
import type { FloorsRepository } from "../repositories/floors-repository";

interface CreateFloorUseCaseRequest {
    buildingId: string
    name: string
}

interface CreateFloorUseCaseResponse {}

export class CreateFloorUseCase {
    constructor(
        private floorsRepository: FloorsRepository,
        private buildingsRepository: BuildingsRepository
    ) {}
    
    async execute({ buildingId, name }: CreateFloorUseCaseRequest): Promise<CreateFloorUseCaseResponse> {
        const building = await this.buildingsRepository.findById(buildingId)

        if(!building) {
            throw new Error()
        }

        const floor = new Floor({ name, buildingId, })

        await this.floorsRepository.create(floor)
        
        return {}
    }
}