import type { Building } from "../entities/building";
import { UserRole } from "../entities/user";
import type { BuildingsRepository } from "../repositories/buildings-repository";
import type { UsersRepository } from "../repositories/users-repositoy";

interface GetBuildingByIdUseCaseRequest {
    userId: string,
    buildingId: string,
}

interface GetBuildingByIdUseCaseResponse {
    building: Building
}

export class GetBuildingByIdUseCase {
    constructor(
        private usersRepository: UsersRepository,
        private buildingsRepository: BuildingsRepository,
    ) {}

    async execute({ userId, buildingId }: GetBuildingByIdUseCaseRequest): Promise<GetBuildingByIdUseCaseResponse> {
        const user = await this.usersRepository.findById(userId)

        if(!user) {
            throw new Error()
        }

        if(user.role !== UserRole.ADMIN && !user.buildingIds.includes(buildingId)) {
            throw new Error()
        }

        const building = await this.buildingsRepository.findById(buildingId)

        if(!building) {
            throw new Error()
        }
        
        return { building, }
    }
}