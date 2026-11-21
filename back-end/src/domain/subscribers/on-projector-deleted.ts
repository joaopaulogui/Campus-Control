import type { EventHandler } from "@core/events/event-handler";
import type { CreateAuditUseCase } from "../use-cases/create-audit-use-case";
import { DomainEvents } from "@/core/events/domain-events";
import { ProjectorDeletedEvent } from "../events/projector-deleted-event";
import { EntityType } from "../entities/audit";
import type { RoomsRepository } from "../repositories/rooms-repository";

export class OnProjectorDeleted implements EventHandler {
    constructor(
        private roomsRepository: RoomsRepository,
        private createAuditUseCase: CreateAuditUseCase
    ) { this.setupSubscriptions() }

    setupSubscriptions(): void {
        DomainEvents.register(this.createNewProjectorDeletionAudit.bind(this), ProjectorDeletedEvent.name)
    }

    private async createNewProjectorDeletionAudit({ projector, userId }: ProjectorDeletedEvent) {
        const room = await this.roomsRepository.findById(projector.roomId)

        if(room) {
            await this.createAuditUseCase.execute({
                userId,
                eventEntity: EntityType.PROJECTOR,
                entityId: projector.id,
                eventType: "projector.deleted",
                description: `Projetor deletado na sala "${room.name}"`,
                metadata: { roomId: room.id, }
            })
        }
    }
}