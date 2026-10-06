import type { Building } from "../entities/building";
import type { BuildingsRepository } from "../repositories/buildings-repository";

interface ListBuildingsUseCaseRequest {}

interface ListBuildingsUseCaseResponse {
    buildings: Building[]
}

export class ListBuildingsUseCase {
    constructor(private buildingsRepository: BuildingsRepository) {}

    async execute(): Promise<ListBuildingsUseCaseResponse> {
        const buildings = await this.buildingsRepository.findMany()

        return { buildings }
    }
}