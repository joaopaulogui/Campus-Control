import type { EventHandler } from "@core/events/event-handler";
import type { CreateAuditUseCase } from "../use-cases/create-audit-use-case";
import { DomainEvents } from "@/core/events/domain-events";
import { AirConditionerDeletedEvent } from "../events/air-conditioner-deleted-event";
import { EntityType } from "../entities/audit";
import type { RoomsRepository } from "../repositories/rooms-repository";

export class OnAirConditionerDeleted implements EventHandler {
    constructor(
        private roomsRepository: RoomsRepository,
        private createAuditUseCase: CreateAuditUseCase
    ) { this.setupSubscriptions() }

    setupSubscriptions(): void {
        DomainEvents.register(this.createNewAirConditionerDeletionAudit.bind(this), AirConditionerDeletedEvent.name)
    }

    private async createNewAirConditionerDeletionAudit({ airConditioner, userId }: AirConditionerDeletedEvent) {
        const room = await this.roomsRepository.findById(airConditioner.roomId)

        if(room) {
            await this.createAuditUseCase.execute({
                userId,
                eventEntity: EntityType.AIR_CONDITIONER,
                entityId: airConditioner.id,
                eventType: "airconditioner.deleted",
                description: `Ar-condicionado deletado na sala "${room.name}"`,
                metadata: { roomId: room.id, }
            })
        }
    }
}