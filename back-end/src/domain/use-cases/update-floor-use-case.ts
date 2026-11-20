import { FloorUpdatedEvent } from "../events/floor-updated-event"
import type { FloorsRepository } from "../repositories/floors-repository"

interface UpdateFloorUseCaseRequest {
    userId: string
    floorId: string
    name?: string | undefined
}

interface UpdateFloorUseCaseResponse {}

export class UpdateFloorUseCase {
    constructor(private floorsRepository: FloorsRepository) {}

    async execute({ userId, floorId, name }: UpdateFloorUseCaseRequest): Promise<UpdateFloorUseCaseResponse> {
        const floor = await this.floorsRepository.findById(floorId)

        if(!floor) {
            throw new Error()
        }

        let updatedData: Record<string, any> = {}

        if(name && name !== floor.name) {
            floor.name = name
            updatedData.name = name
        }

        if(Object.keys(updatedData).length === 0) {
            return {}
        }

        floor.addDomainEvent(new FloorUpdatedEvent(floor, userId, updatedData))

        await this.floorsRepository.save(floor)
    
        return {}
    }
}