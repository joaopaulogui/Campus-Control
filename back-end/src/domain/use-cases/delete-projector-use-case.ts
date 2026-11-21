import { ProjectorDeletedEvent } from "../events/projector-deleted-event"
import type { ProjectorsRepository } from "../repositories/projectors-repository"

interface DeleteProjectorUseCaseRequest {
    userId: string
    projectorId: string
}

interface DeleteProjectorUseCaseResponse {}

export class DeleteProjectorUseCase {
    constructor(private projectorsRepository: ProjectorsRepository) {}

    async execute({ userId, projectorId }: DeleteProjectorUseCaseRequest): Promise<DeleteProjectorUseCaseResponse> {
        const projector = await this.projectorsRepository.findById(projectorId)

        if(!projector) {
            throw new Error()
        }

        projector.addDomainEvent(new ProjectorDeletedEvent(projector, userId))
    
        await this.projectorsRepository.delete(projector)

        return {}
    }
}