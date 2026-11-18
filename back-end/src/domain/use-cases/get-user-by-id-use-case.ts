import type { User } from "../entities/user"
import type { UsersRepository } from "../repositories/users-repositoy"

interface GetUserByIdUseCaseRequest {
    userId: string,
}

interface GetUserByIdUseCaseResponse {
    user: User
}

export class GetUserByIdUseCase {
    constructor(private usersRepository: UsersRepository) {}

    async execute({ userId }: GetUserByIdUseCaseRequest): Promise<GetUserByIdUseCaseResponse> {
        const user = await this.usersRepository.findById(userId)
        
        if(!user) {
            throw new Error()
        }

        return { user }
    }
}