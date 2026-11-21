import type { EventHandler } from "@core/events/event-handler";
import type { CreateAuditUseCase } from "../use-cases/create-audit-use-case";
import { DomainEvents } from "@/core/events/domain-events";
import { AirConditionerRegisteredEvent } from "../events/air-conditioner-registered-event";
import { EntityType } from "../entities/audit";
import type { RoomsRepository } from "../repositories/rooms-repository";

export class OnAirConditionerRegistered implements EventHandler {
    constructor(
        private roomsRepository: RoomsRepository,
        private createAuditUseCase: CreateAuditUseCase
    ) { this.setupSubscriptions() }

    setupSubscriptions(): void {
        DomainEvents.register(this.createNewAirConditionerRegistrationAudit.bind(this), AirConditionerRegisteredEvent.name)
    }

    private async createNewAirConditionerRegistrationAudit({ airConditioner, userId }: AirConditionerRegisteredEvent) {
        const room = await this.roomsRepository.findById(airConditioner.roomId)

        if(room) {
            await this.createAuditUseCase.execute({
                userId,
                eventEntity: EntityType.AIR_CONDITIONER,
                entityId: airConditioner.id,
                eventType: "airconditioner.registered",
                description: `Ar-condicionado registrado na sala "${room.name}"`,
                metadata: { roomId: room.id, }
            })
        }
    }
}