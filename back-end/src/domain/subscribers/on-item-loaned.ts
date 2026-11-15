import { EntityType } from "../entities/audit";
import { ItemLoanedEvent } from "../events/item-loaned-event";
import { DomainEvents } from "@core/events/domain-events";
import type { EventHandler } from "@core/events/event-handler";
import type { UsersRepository } from "../repositories/users-repositoy";
import type { CreateAuditUseCase } from "../use-cases/create-audit-use-case";
import type { ItemsRepository } from "../repositories/items-repository";

export class OnItemLoaned implements EventHandler {
    constructor(
        private usersRepository: UsersRepository,
        private itemsRepository: ItemsRepository,
        private createAuditUseCase: CreateAuditUseCase
    ) { this.setupSubscriptions() }

    setupSubscriptions(): void {
        DomainEvents.register(this.createNewItemLoanedAudit.bind(this), ItemLoanedEvent.name)
    }

    private async createNewItemLoanedAudit({ loan, userId }: ItemLoanedEvent) {
        const user = await this.usersRepository.findById(userId)
        const item = await this.itemsRepository.findById(loan.itemId)

        if(user && item) {
            await this.createAuditUseCase.execute({
                userId,
                eventEntity: EntityType.LOAN,
                entityId: loan.id,
                eventType: "loan.registered",
                description: `Empréstimo de ${loan.quantity} x ${item.name} para ${loan.responsibleName}`,
                metadata: { itemId: item.id, quantity: loan.quantity, responsibleName: loan.responsibleName, responsibleRegistration: loan.responsibleRegistration }
        })}
    }
}