import type { Building } from "../entities/building";
import { UserRole } from "../entities/user";
import type { BuildingsRepository } from "../repositories/buildings-repository";
import type { UsersRepository } from "../repositories/users-repositoy";

interface ListBuildingsUseCaseRequest {
    userId: string
    name?: string | undefined
    page?: number | undefined
    perPage?: number | undefined
}

interface ListBuildingsUseCaseResponse {
    buildings: Building[]
}

export class ListBuildingsUseCase {
    constructor(
        private buildingsRepository: BuildingsRepository,
        private usersRepository: UsersRepository,
    ) {}

    async execute({ userId, name, page = 1, perPage = 30 }: ListBuildingsUseCaseRequest): Promise<ListBuildingsUseCaseResponse> {
        const user = await this.usersRepository.findById(userId)

        if(!user) {
            throw new Error()
        }
        
        const userIdFilter = user.role === UserRole.ADMIN ? undefined : userId
        
        const buildings = await this.buildingsRepository.findManyPaginated({ userId: userIdFilter, name, }, { page, perPage })

        return { buildings }
    }
}