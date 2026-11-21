import type { EventHandler } from "@core/events/event-handler";
import type { CreateAuditUseCase } from "../use-cases/create-audit-use-case";
import { DomainEvents } from "@/core/events/domain-events";
import { AirConditionerUpdatedEvent } from "../events/air-conditioner-updated-event";
import { EntityType } from "../entities/audit";
import type { RoomsRepository } from "../repositories/rooms-repository";

export class OnAirConditionerUpdated implements EventHandler {
    constructor(
        private roomsRepository: RoomsRepository,
        private createAuditUseCase: CreateAuditUseCase
    ) { this.setupSubscriptions() }

    setupSubscriptions(): void {
        DomainEvents.register(this.createNewAirConditionerUpdateAudit.bind(this), AirConditionerUpdatedEvent.name)
    }

    private async createNewAirConditionerUpdateAudit({ airConditioner, updatedData, userId }: AirConditionerUpdatedEvent) {
        const room = await this.roomsRepository.findById(airConditioner.roomId)

        if(room) {
            await this.createAuditUseCase.execute({
                userId,
                eventEntity: EntityType.AIR_CONDITIONER,
                entityId: airConditioner.id,
                eventType: "airconditioner.updated",
                description: `Ar-condicionado atualizado na sala "${room.name}"`,
                metadata: { roomId: room.id, ...updatedData }
            })
        }
    }
}