import { BuildingDeletedEvent } from "../events/building-deleted-event";
import type { BuildingsRepository } from "../repositories/buildings-repository";

interface DeleteBuildingUseCaseRequest {
    userId: string
    buildingId: string
}

interface DeleteBuildingUseCaseResponse {}

export class DeleteBuildingUseCase {
    constructor(private buildingsRepository: BuildingsRepository) {}

    async execute({ userId, buildingId }: DeleteBuildingUseCaseRequest): Promise<DeleteBuildingUseCaseResponse> {
        const building = await this.buildingsRepository.findById(buildingId)

        if (!building) {
            throw new Error()
        }

        building.addDomainEvent(new BuildingDeletedEvent(building, userId))

        await this.buildingsRepository.delete(building)
        
        return {}
    }
}