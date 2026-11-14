import { Floor } from "../entities/floor";
import { FloorRegisteredEvent } from "../events/floor-registered-event";
import type { BuildingsRepository } from "../repositories/buildings-repository";
import type { FloorsRepository } from "../repositories/floors-repository";

interface RegisterFloorUseCaseRequest {
    userId: string
    buildingId: string
    name: string
}

interface RegisterFloorUseCaseResponse {}

export class RegisterFloorUseCase {
    constructor(
        private floorsRepository: FloorsRepository,
        private buildingsRepository: BuildingsRepository
    ) {}
    
    async execute({ userId, buildingId, name }: RegisterFloorUseCaseRequest): Promise<RegisterFloorUseCaseResponse> {
        const building = await this.buildingsRepository.findById(buildingId)

        if(!building) {
            throw new Error()
        }

        const floor = new Floor({ name, buildingId, })

        floor.addDomainEvent(new FloorRegisteredEvent(floor, userId))

        await this.floorsRepository.create(floor)
        
        return {}
    }
}