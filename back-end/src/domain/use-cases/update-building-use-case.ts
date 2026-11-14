import type { BuildingsRepository } from "../repositories/buildings-repository"

interface UpdateBuildingUseCaseRequest {
    buildingId: string
    name?: string | undefined
}

interface UpdateBuildingUseCaseResponse {}

export class UpdateBuildingUseCase {
    constructor(private buildingsRepository: BuildingsRepository) {}

    async execute({ buildingId, name }: UpdateBuildingUseCaseRequest): Promise<UpdateBuildingUseCaseResponse> {
        const building = await this.buildingsRepository.findById(buildingId)

        if(!building) {
            throw new Error()
        }

        if(name) {
            building.name = name
        }

        await this.buildingsRepository.save(building)
    
        return {}
    }
}