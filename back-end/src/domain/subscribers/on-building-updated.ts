import { EntityType } from "../entities/audit";
import { BuildingUpdatedEvent } from "../events/building-updated-event";
import { DomainEvents } from "@core/events/domain-events";
import type { EventHandler } from "@core/events/event-handler";
import type { CreateAuditUseCase } from "../use-cases/create-audit-use-case";

export class OnBuildingUpdated implements EventHandler {
    constructor(
        private createAuditUseCase: CreateAuditUseCase
    ) { this.setupSubscriptions() }

    setupSubscriptions(): void {
        DomainEvents.register(this.createNewBuildingUpdatedAudit.bind(this), BuildingUpdatedEvent.name)
    }

    private async createNewBuildingUpdatedAudit({ building, updatedData, userId }: BuildingUpdatedEvent) {
        await this.createAuditUseCase.execute({
            userId,
            eventEntity: EntityType.BUILDING,
            entityId: building.id,
            eventType: "building.updated",
            description: `Bloco "${building.name}" atualizado`,
            metadata: updatedData
        })
    }
}