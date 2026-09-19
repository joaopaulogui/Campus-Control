import type { FloorsRepository } from "../repositories/floors-repository";

interface DeleteFloorUseCaseRequest {
    floorId: string
}

interface DeleteFloorUseCaseResponse {}

export class DeleteFloorUseCase {
    constructor(private floorsRepository: FloorsRepository) {}

    async execute({ floorId }: DeleteFloorUseCaseRequest): Promise<DeleteFloorUseCaseResponse> {
        const floor = await this.floorsRepository.findById(floorId)

        if (!floor) {
            throw new Error()
        }

        await this.floorsRepository.delete(floor)
        
        return {}
    }
}