import { UserRole } from "../entities/user";
import { UserDeletedEvent } from "../events/user-deleted-event";
import type { UsersRepository } from "../repositories/users-repositoy";

interface DeleteUserUseCaseRequest {
    adminId: string,
    userId: string,
}

interface DeleteUserUseCaseResponse {}

export class DeleteUserUseCase {
    constructor(private usersRepository: UsersRepository) {}

    async execute({ adminId, userId }: DeleteUserUseCaseRequest): Promise<DeleteUserUseCaseResponse> {
        const user = await this.usersRepository.findById(userId)

        if(!user) {
            throw new Error()
        }

        if(user.deletedAt) {
            throw new Error()
        }

        if(userId === adminId) {
            throw new Error()
        }

        user.password = ""
        user.buildingIds = []
        user.delete()

        user.addDomainEvent(new UserDeletedEvent(user, adminId))

        await this.usersRepository.save(user)
        
        return {}
    }
}