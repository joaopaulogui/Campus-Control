import type { Floor } from "../entities/floor";
import { UserRole } from "../entities/user";
import type { FloorWithBuilding } from "../entities/value-objects/floor-with-building";
import type { FloorsRepository } from "../repositories/floors-repository";
import type { UsersRepository } from "../repositories/users-repositoy";

interface GetFloorByIdUseCaseRequest {
    userId: string,
    floorId: string,
}

interface GetFloorByIdUseCaseResponse {
    floor: FloorWithBuilding
}

export class GetFloorByIdUseCase {
    constructor(
        private usersRepository: UsersRepository,
        private floorsRepository: FloorsRepository,
    ) {}

    async execute({ userId, floorId }: GetFloorByIdUseCaseRequest): Promise<GetFloorByIdUseCaseResponse> {
        const user = await this.usersRepository.findById(userId)

        if(!user) {
            throw new Error()
        }

        const floor = await this.floorsRepository.findByIdWithBuilding(floorId)

        if(!floor) {
            throw new Error()
        }

        if(user.role !== UserRole.ADMIN && !user.buildingIds.includes(floor.buildingId)) {
            throw new Error()
        }

        return { floor, }
    }
}