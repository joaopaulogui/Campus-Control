import type { EventHandler } from "@core/events/event-handler";
import type { CreateAuditUseCase } from "../use-cases/create-audit-use-case";
import { DomainEvents } from "@/core/events/domain-events";
import { ProjectorUpdatedEvent } from "../events/projector-updated-event";
import { EntityType } from "../entities/audit";
import type { RoomsRepository } from "../repositories/rooms-repository";

export class OnProjectorUpdated implements EventHandler {
    constructor(
        private roomsRepository: RoomsRepository,
        private createAuditUseCase: CreateAuditUseCase
    ) { this.setupSubscriptions() }

    setupSubscriptions(): void {
        DomainEvents.register(this.createNewProjectorUpdateAudit.bind(this), ProjectorUpdatedEvent.name)
    }

    private async createNewProjectorUpdateAudit({ projector, userId }: ProjectorUpdatedEvent) {
        const room = await this.roomsRepository.findById(projector.roomId)

        if(room) {
            await this.createAuditUseCase.execute({
                userId,
                eventEntity: EntityType.PROJECTOR,
                entityId: projector.id,
                eventType: "projector.updated",
                description: `Projetor atualizado na sala "${room.name}"`,
                metadata: { roomId: room.id, }
            })
        }
    }
}