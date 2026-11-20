import type { ProjectorStatus } from "../entities/projector"
import { ProjectorUpdatedEvent } from "../events/projector-updated-event"
import type { ProjectorsRepository } from "../repositories/projectors-repository"

interface UpdateProjectorStatusUseCaseRequest {
    userId: string
    projectorId: string
    status: ProjectorStatus
}

interface UpdateProjectorStatusUseCaseResponse {}

export class UpdateProjectorStatusUseCase {
    constructor(private projectorsRepository: ProjectorsRepository) {}

    async execute({ userId, projectorId, status }: UpdateProjectorStatusUseCaseRequest): Promise<UpdateProjectorStatusUseCaseResponse> {
        const projector = await this.projectorsRepository.findById(projectorId)

        if(!projector) {
            throw new Error()
        }

        if(status) {
            if(status !== projector.status) {
                return {}
            }

            projector.status = status
        }

        projector.addDomainEvent(new ProjectorUpdatedEvent(projector, userId, { status }))

        await this.projectorsRepository.save(projector)
    
        return {}
    }
}