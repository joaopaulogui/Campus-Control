import { UserRole } from "../entities/user"; 
import type { FloorsRepository } from "../repositories/floors-repository";
import type { UsersRepository } from "../repositories/users-repositoy";
import type { Floor } from "../entities/floor";

interface SelectFloorsUseCaseRequest {
    userId: string
    buildingId?: string | undefined
    name?: string | undefined
    page?: number | undefined
    perPage?: number | undefined
}

interface SelectFloorsUseCaseResponse {
    floors: Floor[]
}

export class SelectFloorsUseCase {
    constructor(
        private floorsRepository: FloorsRepository,
        private usersRepository: UsersRepository
    ) {}

    async execute({ userId, buildingId, name, page = 1, perPage = 30 }: SelectFloorsUseCaseRequest): Promise<SelectFloorsUseCaseResponse> {
        const user = await this.usersRepository.findById(userId)

        if(!user) {
            throw new Error()
        }
        
        let buildingIds: string[] | undefined
        
        if(user.role === UserRole.ADMIN) {
            buildingIds = buildingId ? [buildingId] : undefined
        } else {    
            if(buildingId) {
                if(!user.buildingIds.includes(buildingId)) {
                    buildingIds = []
                }
                    
                buildingIds = [buildingId]    
            } else {
                buildingIds = user.buildingIds
            }
        }

        const floors = await this.floorsRepository.findManyPaginated({ 
            buildingIds, 
            name 
        }, { page, perPage })
        
        return { floors, }
    }
}