import type { UserRole } from "../entities/user"
import type { User } from "../entities/user"
import type { UsersRepository } from "../repositories/users-repositoy"

interface SelectUsersUseCaseRequest {
    name?: string | undefined,
    email?: string | undefined,
    role?: UserRole | undefined
}

interface SelectUsersUseCaseResponse {
    users: User[]
}

export class SelectUsersUseCase {
    constructor(private usersRepository: UsersRepository) {}

    async execute({ name, email, role }: SelectUsersUseCaseRequest): Promise<SelectUsersUseCaseResponse> {
        const users = await this.usersRepository.findMany({ name, email, role })
        
        return { users }
    }
}