import type { Building } from "../entities/building"
import type { User } from "../entities/user"
import type { BuildingsRepository } from "../repositories/buildings-repository"
import type { UsersRepository } from "../repositories/users-repositoy"

interface GetUserProfileUseCaseRequest {
    userId: string
}

interface GetUserProfileUseCaseResponse {
    user: User,
    buildings: Building[]
}

export class GetUserProfileUseCase {
    constructor(
        private usersRepository: UsersRepository,
        private buildingsRepository: BuildingsRepository
    ) {}

    async execute({ userId }: GetUserProfileUseCaseRequest): Promise<GetUserProfileUseCaseResponse> {
        const user = await this.usersRepository.findById(userId)

        if(!user) {
            throw new Error()
        }
        
        return {
            user,
            buildings: []
        }
    }
}