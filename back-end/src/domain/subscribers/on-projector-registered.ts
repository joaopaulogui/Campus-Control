import type { EventHandler } from "@core/events/event-handler";
import type { CreateAuditUseCase } from "../use-cases/create-audit-use-case";
import { DomainEvents } from "@/core/events/domain-events";
import { ProjectorRegisteredEvent } from "../events/projector-registered-event";
import { EntityType } from "../entities/audit";
import type { RoomsRepository } from "../repositories/rooms-repository";

export class OnProjectorRegistered implements EventHandler {
    constructor(
        private roomsRepository: RoomsRepository,
        private createAuditUseCase: CreateAuditUseCase
    ) { this.setupSubscriptions() }

    setupSubscriptions(): void {
        DomainEvents.register(this.createNewProjectorRegistrationAudit.bind(this), ProjectorRegisteredEvent.name)
    }

    private async createNewProjectorRegistrationAudit({ projector, userId }: ProjectorRegisteredEvent) {
        const room = await this.roomsRepository.findById(projector.roomId)

        if(room) {
            await this.createAuditUseCase.execute({
                userId,
                eventEntity: EntityType.PROJECTOR,
                entityId: projector.id,
                eventType: "projector.registered",
                description: `Projetor registrado na sala "${room.name}"`,
                metadata: { roomId: room.id, }
            })
        }
    }
}