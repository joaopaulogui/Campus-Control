import { Floor } from "../entities/floor";
import type { BuildingsRepository } from "../repositories/buildings-repository";
import type { FloorsRepository } from "../repositories/floors-repository";

interface RegisterFloorUseCaseRequest {
    buildingId: string
    name: string
}

interface RegisterFloorUseCaseResponse {}

export class RegisterFloorUseCase {
    constructor(
        private floorsRepository: FloorsRepository,
        private buildingsRepository: BuildingsRepository
    ) {}
    
    async execute({ buildingId, name }: RegisterFloorUseCaseRequest): Promise<RegisterFloorUseCaseResponse> {
        const building = await this.buildingsRepository.findById(buildingId)

        if(!building) {
            throw new Error()
        }

        const floor = new Floor({ name, buildingId, })

        await this.floorsRepository.create(floor)
        
        return {}
    }
}