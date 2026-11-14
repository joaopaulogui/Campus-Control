import { EntityType } from "../entities/audit";
import { ItemRegisteredEvent } from "../events/item-registered-event";
import { DomainEvents } from "@core/events/domain-events";
import type { EventHandler } from "@core/events/event-handler";
import type { UsersRepository } from "../repositories/users-repositoy";
import type { CreateAuditUseCase } from "../use-cases/create-audit-use-case";

export class OnItemRegistered implements EventHandler {
    constructor(
        private usersRepository: UsersRepository,
        private createAuditUseCase: CreateAuditUseCase
    ) { this.setupSubscriptions() }

    setupSubscriptions(): void {
        DomainEvents.register(this.createNewItemRegisteredAudit.bind(this), ItemRegisteredEvent.name)
    }

    private async createNewItemRegisteredAudit({ item, userId }: ItemRegisteredEvent) {
        const user = await this.usersRepository.findById(userId)

        if(user) {
            await this.createAuditUseCase.execute({
                userId,
                eventEntity: EntityType.ITEM,
                entityId: item.id,
                eventType: "item.registered",
                description: `Item "${item.name}" registrado`,
                metadata: { name: item.name, type: item.type, totalQuantity: item.totalQuantity }
        })}
    }
}