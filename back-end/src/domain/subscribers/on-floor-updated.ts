import type { EventHandler } from "@core/events/event-handler";
import type { CreateAuditUseCase } from "../use-cases/create-audit-use-case";
import { DomainEvents } from "@/core/events/domain-events";
import { FloorUpdatedEvent } from "../events/floor-updated-event";
import { EntityType } from "../entities/audit";
import type { BuildingsRepository } from "../repositories/buildings-repository";

export class OnFloorUpdated implements EventHandler {
    constructor(
        private buildingsRepository: BuildingsRepository,
        private createAuditUseCase: CreateAuditUseCase
    ) { this.setupSubscriptions() }

    setupSubscriptions(): void {
        DomainEvents.register(this.createNewFloorUpdateAudit.bind(this), FloorUpdatedEvent.name)
    }

    private async createNewFloorUpdateAudit({ floor, updatedData, userId }: FloorUpdatedEvent) {
        const building = await this.buildingsRepository.findById(floor.buildingId)

        if(building) {
            await this.createAuditUseCase.execute({
                userId,
                eventEntity: EntityType.FLOOR,
                entityId: floor.id,
                eventType: "floor.updated",
                description: `Andar "${floor.name}" atualizado no bloco "${building.name}"`,
                metadata: { buildingId: floor.buildingId, ...updatedData }
            })
        }
    }
}