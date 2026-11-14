import { EntityType } from "../entities/audit";
import { UserRegisteredEvent } from "../events/user-registered-event";
import { DomainEvents } from "@core/events/domain-events";
import type { EventHandler } from "@core/events/event-handler";
import type { UsersRepository } from "../repositories/users-repositoy";
import type { CreateAuditUseCase } from "../use-cases/create-audit-use-case";

export class OnUserRegistered implements EventHandler {
    constructor(
        private usersRepository: UsersRepository,
        private createAuditUseCase: CreateAuditUseCase
    ) { this.setupSubscriptions() }

    setupSubscriptions(): void {
        DomainEvents.register(this.createNewUserRegisteredAudit.bind(this), UserRegisteredEvent.name)
    }

    private async createNewUserRegisteredAudit({ user, adminId }: UserRegisteredEvent) {
        const admin = await this.usersRepository.findById(adminId)

        if(admin) {
            await this.createAuditUseCase.execute({
                userId: adminId,
                eventEntity: EntityType.USER,
                entityId: user.id,
                eventType: "user.registered",
                description: `Usuário "${user.name}" registrado por "${admin.name}"`,
                metadata: { name: user.name, role: user.role }
        })}
    }
}