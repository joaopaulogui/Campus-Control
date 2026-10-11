import { Audit, type EntityType } from "../entities/audit";
import type { AuditsRepository } from "../repositories/audits-repository";

interface CreateAuditUseCaseRequest {
    userId?: string | undefined
    eventType: string
    eventEntity: EntityType
    entityId: string
    description: string
    metadata: object
}

interface CreateAuditUseCaseResponse {}

export class CreateAuditUseCase {
    constructor(
        private auditsRepository: AuditsRepository,
    ) {}

    async execute({ 
        userId, 
        eventType, 
        eventEntity, 
        entityId, 
        description, 
        metadata 
    }: CreateAuditUseCaseRequest): Promise<CreateAuditUseCaseResponse> {
        const audit = new Audit({
            userId: userId ?? null, 
            eventType, 
            eventEntity, 
            entityId, 
            description, 
            metadata,
            createdAt: new Date()
        })

        await this.auditsRepository.create(audit)
        
        return {}
    }
}