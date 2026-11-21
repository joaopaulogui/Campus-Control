import type { EventHandler } from "@core/events/event-handler";
import type { CreateAuditUseCase } from "../use-cases/create-audit-use-case";
import { DomainEvents } from "@/core/events/domain-events";
import { RoomUpdatedEvent } from "../events/room-updated-event";
import { EntityType } from "../entities/audit";
import type { FloorsRepository } from "../repositories/floors-repository";
import type { BuildingsRepository } from "../repositories/buildings-repository";

export class OnRoomUpdated implements EventHandler {
    constructor(
        private floorsRepository: FloorsRepository,
        private buildingsRepository: BuildingsRepository,
        private createAuditUseCase: CreateAuditUseCase
    ) { this.setupSubscriptions() }

    setupSubscriptions(): void {
        DomainEvents.register(this.createNewRoomUpdateAudit.bind(this), RoomUpdatedEvent.name)
    }

    private async createNewRoomUpdateAudit({ room, updatedData, userId }: RoomUpdatedEvent) {
        const floor = await this.floorsRepository.findById(room.floorId)

        const building = await this.buildingsRepository.findById(floor!.buildingId)

        if(floor && building) {
            await this.createAuditUseCase.execute({
                userId,
                eventEntity: EntityType.ROOM,
                entityId: room.id,
                eventType: "room.updated",
                description: `Sala "${room.name}" atualizada no andar "${floor.name}" do bloco "${building.name}"`,
                metadata: { buildingId: building.id, floorId: floor.id, ...updatedData }
            })
        }
    }
}