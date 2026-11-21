import type { EventHandler } from "@core/events/event-handler";
import type { CreateAuditUseCase } from "../use-cases/create-audit-use-case";
import { DomainEvents } from "@/core/events/domain-events";
import { FloorDeletedEvent } from "../events/floor-deleted-event";
import { EntityType } from "../entities/audit";
import type { BuildingsRepository } from "../repositories/buildings-repository";

export class OnFloorDeleted implements EventHandler {
    constructor(
        private buildingsRepository: BuildingsRepository,
        private createAuditUseCase: CreateAuditUseCase
    ) { this.setupSubscriptions() }

    setupSubscriptions(): void {
        DomainEvents.register(this.createNewFloorDeletionAudit.bind(this), FloorDeletedEvent.name)
    }

    private async createNewFloorDeletionAudit({ floor, userId }: FloorDeletedEvent) {
        const building = await this.buildingsRepository.findById(floor.buildingId)

        if(building) {
            await this.createAuditUseCase.execute({
                userId,
                eventEntity: EntityType.FLOOR,
                entityId: floor.id,
                eventType: "floor.deleted",
                description: `Andar "${floor.name}" deletado no bloco "${building.name}"`,
                metadata: { name: floor.name, buildingId: floor.buildingId }
            })
        }
    }
}