import type { Floor } from "../entities/floor";
import type { FloorsRepository } from "../repositories/floors-repository";

interface ListFloorsUseCaseRequest {
    buildingId?: string | undefined
    name?: string | undefined
    page?: number | undefined
    perPage?: number | undefined
}

interface ListFloorsUseCaseResponse {
    floors: Floor[]
}

export class ListFloorsUseCase {
    constructor(private floorsRepository: FloorsRepository) {}

    async execute({ buildingId, name, page, perPage }: ListFloorsUseCaseRequest): Promise<ListFloorsUseCaseResponse> {
        if(!page) { page = 1 }
        
        if(!perPage) { perPage = 30 }
        
        const floors = await this.floorsRepository.findManyPaginated({ buildingId, name }, { page, perPage })
        
        return { floors, }
    }
}