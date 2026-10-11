import { EntityType } from "../entities/audit";
import { BuildingRegisteredEvent } from "../events/building-registered";
import { DomainEvents } from "../events/domain-events";
import type { EventHandler } from "../events/event-handler";
import type { UsersRepository } from "../repositories/users-repositoy";
import type { CreateAuditUseCase } from "../use-cases/create-audit-use-case";

export class onBuildingRegistered implements EventHandler {
    constructor(
        private usersRepository: UsersRepository,
        private createAuditUseCase: CreateAuditUseCase
    ) { this.setupSubscriptions() }

    setupSubscriptions(): void {
        DomainEvents.register(this.createNewBuildingRegisteredAudit.bind(this), BuildingRegisteredEvent.name)
    }

    private async createNewBuildingRegisteredAudit({ building, userId }: BuildingRegisteredEvent) {
        const user = await this.usersRepository.findById(userId)

        if(user) {
            await this.createAuditUseCase.execute({
                userId: user.id,
                eventEntity: EntityType.BUILDING,
                entityId: building.id,
                eventType: "building.registered",
                description: `Bloco ${building.name} criado`,
                metadata: { name: building.name }
        })}
    }
}