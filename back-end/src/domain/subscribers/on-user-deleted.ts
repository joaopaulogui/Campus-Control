import { EntityType } from "../entities/audit";
import { UserDeletedEvent } from "../events/user-deleted-event";
import { DomainEvents } from "@core/events/domain-events";
import type { EventHandler } from "@core/events/event-handler";
import type { UsersRepository } from "../repositories/users-repositoy";
import type { CreateAuditUseCase } from "../use-cases/create-audit-use-case";

export class OnUserDeleted implements EventHandler {
    constructor(
        private usersRepository: UsersRepository,
        private createAuditUseCase: CreateAuditUseCase
    ) { this.setupSubscriptions() }

    setupSubscriptions(): void {
        DomainEvents.register(this.createNewUserDeletedAudit.bind(this), UserDeletedEvent.name)
    }

    private async createNewUserDeletedAudit({ user, adminId }: UserDeletedEvent) {
        const admin = await this.usersRepository.findById(adminId)

        if(admin) {
            await this.createAuditUseCase.execute({
                userId: adminId,
                eventEntity: EntityType.USER,
                entityId: user.id,
                eventType: "user.deleted",
                description: `Usuário "${user.name}" deletado por "${admin.name}"`,
                metadata: { name: user.name, role: user.role }
        })}
    }
}