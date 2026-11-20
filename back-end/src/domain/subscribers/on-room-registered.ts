import type { EventHandler } from "@core/events/event-handler";
import type { CreateAuditUseCase } from "../use-cases/create-audit-use-case";
import { DomainEvents } from "@/core/events/domain-events";
import { RoomRegisteredEvent } from "../events/room-registered-event";
import { EntityType } from "../entities/audit";
import type { FloorsRepository } from "../repositories/floors-repository";
import type { BuildingsRepository } from "../repositories/buildings-repository";

export class OnRoomRegistered implements EventHandler {
    constructor(
        private floorsRepository: FloorsRepository,
        private buildingsRepository: BuildingsRepository,
        private createAuditUseCase: CreateAuditUseCase
    ) { this.setupSubscriptions() }

    setupSubscriptions(): void {
        DomainEvents.register(this.createNewRoomRegistrationAudit.bind(this), RoomRegisteredEvent.name)
    }

    private async createNewRoomRegistrationAudit({ room, userId }: RoomRegisteredEvent) {
        const floor = await this.floorsRepository.findById(room.floorId)

        const building = await this.buildingsRepository.findById(floor!.buildingId)

        if(floor && building) {
            await this.createAuditUseCase.execute({
                userId,
                eventEntity: EntityType.ROOM,
                entityId: room.id,
                eventType: "room.registered",
                description: `Sala "${room.name}" registrada no andar "${floor.name}" do bloco "${building.name}"`,
                metadata: { 
                    name: room.name, 
                    type: room.type, 
                    capacity: room.capacity, 
                    buildingId: building.id, 
                    floorId: floor.id 
                }
            })
        }
    }
}