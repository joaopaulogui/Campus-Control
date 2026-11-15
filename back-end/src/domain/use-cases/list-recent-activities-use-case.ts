import { EntityType, type Audit } from "../entities/audit"
import type { AuditsRepository } from "../repositories/audits-repository"

interface ListRecentActivitiesUseCaseRequest {
    page?: number | undefined
    perPage?: number | undefined
}

interface ListRecentActivitiesUseCaseResponse {
    audits: Audit[]
}

export class ListRecentActivitiesUseCase {
    constructor(private auditsRepository: AuditsRepository) {}

    async execute({
        page,
        perPage
    }: ListRecentActivitiesUseCaseRequest): Promise<ListRecentActivitiesUseCaseResponse> {
        if(!page) { page = 1 }

        if(!perPage) { perPage = 30 }

        const audits = await this.auditsRepository.findManyPaginated(
            { eventEntity: EntityType.LOAN }, 
            { page, perPage }
        ) 
        
        return { audits }
    }
}