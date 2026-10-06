import type { Floor } from "../entities/floor";
import type { FloorsRepository } from "../repositories/floors-repository";

interface ListFloorsUseCaseRequest {
    buildingId?: string | undefined
}

interface ListFloorsUseCaseResponse {
    floors: Floor[]
}

export class ListFloorsUseCase {
    constructor(private floorsRepository: FloorsRepository) {}

    async execute({ buildingId }: ListFloorsUseCaseRequest): Promise<ListFloorsUseCaseResponse> {
        const floors = await this.floorsRepository.findMany({ buildingId, })
        
        return { floors, }
    }
}