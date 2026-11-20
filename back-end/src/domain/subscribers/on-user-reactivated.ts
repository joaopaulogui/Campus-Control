import { EntityType } from "../entities/audit";
import { UserReactivatedEvent } from "../events/user-reactivated-event";
import { DomainEvents } from "@core/events/domain-events";
import type { EventHandler } from "@core/events/event-handler";
import type { UsersRepository } from "../repositories/users-repositoy";
import type { CreateAuditUseCase } from "../use-cases/create-audit-use-case";

export class OnUserReactivated implements EventHandler {
    constructor(
        private usersRepository: UsersRepository,
        private createAuditUseCase: CreateAuditUseCase
    ) { this.setupSubscriptions() }

    setupSubscriptions(): void {
        DomainEvents.register(this.createNewUserReactivatedAudit.bind(this), UserReactivatedEvent.name)
    }

    private async createNewUserReactivatedAudit({ user, adminId }: UserReactivatedEvent) {
        const admin = await this.usersRepository.findById(adminId)

        if(admin) {
            await this.createAuditUseCase.execute({
                userId: adminId,
                eventEntity: EntityType.USER,
                entityId: user.id,
                eventType: "user.reactivated",
                description: `Conta do usuário "${user.name}" reativada por "${admin.name}"`,
                metadata: { name: user.name, role: user.role }
        })}
    }
}