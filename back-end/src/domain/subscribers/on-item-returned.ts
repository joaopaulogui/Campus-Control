import { EntityType } from "../entities/audit";
import { ItemReturnedEvent } from "../events/item-returned-event";
import { DomainEvents } from "@core/events/domain-events";
import type { EventHandler } from "@core/events/event-handler";
import type { CreateAuditUseCase } from "../use-cases/create-audit-use-case";
import type { ItemsRepository } from "../repositories/items-repository";

export class OnItemReturned implements EventHandler {
    constructor(
        private itemsRepository: ItemsRepository,
        private createAuditUseCase: CreateAuditUseCase
    ) { this.setupSubscriptions() }

    setupSubscriptions(): void {
        DomainEvents.register(this.createNewItemReturnedAudit.bind(this), ItemReturnedEvent.name)
    }

    private async createNewItemReturnedAudit({ loan, userId }: ItemReturnedEvent) {
        const item = await this.itemsRepository.findById(loan.itemId)

        if(item) {
            await this.createAuditUseCase.execute({
                userId,
                eventEntity: EntityType.LOAN,
                entityId: loan.id,
                eventType: "loan.returned",
                description: `Empréstimo de ${loan.quantity} x ${item.name} devolvido por ${loan.responsibleName}`,
                metadata: { itemId: item.id, 
                    quantity: loan.quantity, 
                    responsibleName: loan.responsibleName, 
                    responsibleRegistration: loan.responsibleRegistration 
                }
        })}
    }
}