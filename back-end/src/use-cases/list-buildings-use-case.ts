import type { Building } from "../entities/building";
import type { BuildingsRepository } from "../repositories/buildings-repository";

interface ListBuildingsUseCaseRequest {
    name?: string | undefined
    page?: number | undefined
    perPage?: number | undefined
}

interface ListBuildingsUseCaseResponse {
    buildings: Building[]
}

export class ListBuildingsUseCase {
    constructor(private buildingsRepository: BuildingsRepository) {}

    async execute({ name, page, perPage }: ListBuildingsUseCaseRequest): Promise<ListBuildingsUseCaseResponse> {
        if(!page) { page = 1 }

        if(!perPage) { perPage = 30 }

        const buildings = await this.buildingsRepository.findManyPaginated(page, perPage, { name, })

        return { buildings }
    }
}