import type { BuildingsRepository } from "../repositories/buildings-repository";

interface DeleteBuildingUseCaseRequest {
    buildingId: string
}

interface DeleteBuildingUseCaseResponse {}

export class DeleteBuildingUseCase {
    constructor(private buildingsRepository: BuildingsRepository) {}

    async execute({ buildingId }: DeleteBuildingUseCaseRequest): Promise<DeleteBuildingUseCaseResponse> {
        const building = await this.buildingsRepository.findById(buildingId)

        if (!building) {
            throw new Error()
        }

        await this.buildingsRepository.delete(building)
        
        return {}
    }
}