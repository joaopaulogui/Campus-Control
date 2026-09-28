import type { FloorsRepository } from "../repositories/floors-repository"

interface UpdateFloorUseCaseRequest {
    floorId: string
    name?: string
}

interface UpdateFloorUseCaseResponse {}

export class UpdateFloorUseCase {
    constructor(private floorsRepository: FloorsRepository) {}

    async execute({ floorId, name }: UpdateFloorUseCaseRequest): Promise<UpdateFloorUseCaseResponse> {
        const floor = await this.floorsRepository.findById(floorId)

        if(!floor) {
            throw new Error()
        }

        if(name) {
            floor.name = name
        }

        await this.floorsRepository.save(floor)
    
        return {}
    }
}