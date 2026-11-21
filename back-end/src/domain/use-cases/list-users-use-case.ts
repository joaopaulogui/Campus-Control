import type { UserRole } from "../entities/user"
import type { User } from "../entities/user"
import type { UsersRepository } from "../repositories/users-repositoy"

interface ListUsersUseCaseRequest {
    name?: string | undefined,
    email?: string | undefined,
    role?: UserRole | undefined
}

interface ListUsersUseCaseResponse {
    users: User[]
}

export class ListUsersUseCase {
    constructor(private usersRepository: UsersRepository) {}

    async execute({ name, email, role }: ListUsersUseCaseRequest): Promise<ListUsersUseCaseResponse> {
        const users = await this.usersRepository.findMany({ name, email, role })
        
        return { users }
    }
}