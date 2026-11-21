import { BuildingUpdatedEvent } from "../events/building-updated-event"
import type { BuildingsRepository } from "../repositories/buildings-repository"

interface UpdateBuildingUseCaseRequest {
    userId: string
    buildingId: string
    name?: string | undefined
}

interface UpdateBuildingUseCaseResponse {}

export class UpdateBuildingUseCase {
    constructor(private buildingsRepository: BuildingsRepository) {}

    async execute({ userId, buildingId, name }: UpdateBuildingUseCaseRequest): Promise<UpdateBuildingUseCaseResponse> {
        const building = await this.buildingsRepository.findById(buildingId)

        if(!building) {
            throw new Error()
        }

        let updatedData: Record<string, any> = {}

        if(name && name !== building.name) {
            building.name = name
            updatedData.name = name
        }

        if(Object.keys(updatedData).length === 0) {
            return {}
        }

        building.addDomainEvent(new BuildingUpdatedEvent(building, userId, updatedData))

        await this.buildingsRepository.save(building)
    
        return {}
    }
}