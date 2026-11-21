import { EntityType } from "../entities/audit";
import { BuildingDeletedEvent } from "../events/building-deleted-event";
import { DomainEvents } from "@core/events/domain-events";
import type { EventHandler } from "@core/events/event-handler";
import type { CreateAuditUseCase } from "../use-cases/create-audit-use-case";

export class OnBuildingDeleted implements EventHandler {
    constructor(
        private createAuditUseCase: CreateAuditUseCase
    ) { this.setupSubscriptions() }

    setupSubscriptions(): void {
        DomainEvents.register(this.createNewBuildingDeletedAudit.bind(this), BuildingDeletedEvent.name)
    }

    private async createNewBuildingDeletedAudit({ building, userId }: BuildingDeletedEvent) {
        await this.createAuditUseCase.execute({
            userId,
            eventEntity: EntityType.BUILDING,
            entityId: building.id,
            eventType: "building.deleted",
            description: `Bloco "${building.name}" registrado`,
            metadata: { name: building.name }
        })
    }
}