import type { Floor } from "../entities/floor";
import type { FloorsRepository } from "../repositories/floors-repository";

interface ListAllFloorsUseCaseRequest {}

interface ListAllFloorsUseCaseResponse {
    floors: Floor[]
}

export class ListAllFloorsUseCase {
    constructor(private floorsRepository: FloorsRepository) {}

    async execute(): Promise<ListAllFloorsUseCaseResponse> {
        const floors = await this.floorsRepository.findMany()
        
        return { floors, }
    }
}