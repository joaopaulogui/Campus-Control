import { UserRole } from "../entities/user"; 
import type { Floor } from "../entities/floor";
import type { FloorsRepository } from "../repositories/floors-repository";
import type { UsersRepository } from "../repositories/users-repositoy";

interface ListFloorsUseCaseRequest {
    userId: string
    buildingId?: string | undefined
    name?: string | undefined
    page?: number | undefined
    perPage?: number | undefined
}

interface ListFloorsUseCaseResponse {
    floors: Floor[]
}

export class ListFloorsUseCase {
    constructor(
        private floorsRepository: FloorsRepository,
        private usersRepository: UsersRepository
    ) {}

    async execute({ userId, buildingId, name, page = 1, perPage = 30 }: ListFloorsUseCaseRequest): Promise<ListFloorsUseCaseResponse> {
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