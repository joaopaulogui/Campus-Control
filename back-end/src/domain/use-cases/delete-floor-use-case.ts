import { FloorDeletedEvent } from "../events/floor-deleted-event";
import type { FloorsRepository } from "../repositories/floors-repository";

interface DeleteFloorUseCaseRequest {
    userId: string
    floorId: string
}

interface DeleteFloorUseCaseResponse {}

export class DeleteFloorUseCase {
    constructor(private floorsRepository: FloorsRepository) {}

    async execute({ userId, floorId }: DeleteFloorUseCaseRequest): Promise<DeleteFloorUseCaseResponse> {
        const floor = await this.floorsRepository.findById(floorId)

        if (!floor) {
            throw new Error()
        }

        floor.addDomainEvent(new FloorDeletedEvent(floor, userId))

        await this.floorsRepository.delete(floor)
        
        return {}
    }
}