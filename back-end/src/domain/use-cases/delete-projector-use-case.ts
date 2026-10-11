import type { ProjectorsRepository } from "../repositories/projectors-repository"

interface DeleteProjectorUseCaseRequest {
    projectorId: string
}

interface DeleteProjectorUseCaseResponse {}

export class DeleteProjectorUseCase {
    constructor(private projectorsRepository: ProjectorsRepository) {}

    async execute({ projectorId }: DeleteProjectorUseCaseRequest): Promise<DeleteProjectorUseCaseResponse> {
        const projector = await this.projectorsRepository.findById(projectorId)

        if(!projector) {
            throw new Error()
        }
    
        await this.projectorsRepository.delete(projector)

        return {}
    }
}