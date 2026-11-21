import type { EventHandler } from "@core/events/event-handler";
import type { CreateAuditUseCase } from "../use-cases/create-audit-use-case";
import { DomainEvents } from "@/core/events/domain-events";
import { FloorRegisteredEvent } from "../events/floor-registered-event";
import { EntityType } from "../entities/audit";
import type { BuildingsRepository } from "../repositories/buildings-repository";

export class OnFloorRegistered implements EventHandler {
    constructor(
        private buildingsRepository: BuildingsRepository,
        private createAuditUseCase: CreateAuditUseCase
    ) { this.setupSubscriptions() }

    setupSubscriptions(): void {
        DomainEvents.register(this.createNewFloorRegistrationAudit.bind(this), FloorRegisteredEvent.name)
    }

    private async createNewFloorRegistrationAudit({ floor, userId }: FloorRegisteredEvent) {
        const building = await this.buildingsRepository.findById(floor.buildingId)

        if(building) {
            await this.createAuditUseCase.execute({
                userId,
                eventEntity: EntityType.FLOOR,
                entityId: floor.id,
                eventType: "floor.registered",
                description: `Andar "${floor.name}" registrado no bloco "${building.name}"`,
                metadata: { name: floor.name, buildingId: floor.buildingId }
            })
        }
    }
}