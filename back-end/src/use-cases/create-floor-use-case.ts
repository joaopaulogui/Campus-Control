import { Floor } from "../entities/floor";
import type { FloorsRepository } from "../repositories/floors-repository";

interface CreateFloorUseCaseRequest {
    name: string
}

interface CreateFloorUseCaseResponse {}

export class CreateFloorUseCase {
    constructor(private floorsRepository: FloorsRepository) {}
    
    async execute({ name }: CreateFloorUseCaseRequest): Promise<CreateFloorUseCaseResponse> {
        const floor = new Floor({ name })

        await this.floorsRepository.create(floor)
        
        return {}
    }
}