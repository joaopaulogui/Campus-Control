import type { ProjectorStatus } from "../entities/projector"
import type { ProjectorsRepository } from "../repositories/projectors-repository"

interface UpdateProjectorStatusUseCaseRequest {
    projectorId: string
    status?: ProjectorStatus | undefined
}

interface UpdateProjectorStatusUseCaseResponse {}

export class UpdateProjectorStatusUseCase {
    constructor(private projectorsRepository: ProjectorsRepository) {}

    async execute({ projectorId, status }: UpdateProjectorStatusUseCaseRequest): Promise<UpdateProjectorStatusUseCaseResponse> {
        const projector = await this.projectorsRepository.findById(projectorId)

        if(!projector) {
            throw new Error()
        }

        if(status) {
            projector.status = status
        }

        await this.projectorsRepository.save(projector)
    
        return {}
    }
}