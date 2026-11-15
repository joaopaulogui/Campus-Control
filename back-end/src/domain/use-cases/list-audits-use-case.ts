import type { Audit, EntityType } from "../entities/audit"
import type { AuditsRepository } from "../repositories/audits-repository"

interface ListAuditsUseCaseRequest {
    userId?: string | undefined
    eventType?: string | undefined
    eventEntity?: EntityType | undefined
    entityId?: string | undefined
    description?: string | undefined
    page?: number | undefined
    perPage?: number | undefined
}

interface ListAuditsUseCaseResponse {
    audits: Audit[]
}

export class ListAuditsUseCase {
    constructor(private auditsRepository: AuditsRepository) {}

    async execute({
        userId,
        eventType,
        eventEntity,
        entityId,
        description,
        page,
        perPage
    }: ListAuditsUseCaseRequest): Promise<ListAuditsUseCaseResponse> {
        if(!page) { page = 1 }

        if(!perPage) { perPage = 30 }

        const audits = await this.auditsRepository.findManyPaginated(
            { userId, eventType, eventEntity, entityId, description }, 
            { page, perPage }
        ) 
        
        return { audits }
    }
}