import type { Projector, ProjectorStatus } from "../entities/projector"
import type { ProjectorsRepository } from "../repositories/projectors-repository"
import type { UsersRepository } from "../repositories/users-repositoy"
import { UserRole } from "../entities/user"
import type { ProjectorWithRoom } from "../entities/value-objects/projector-with-room"

interface ListProjectorsUseCaseRequest {
    userId: string
    buildingId?: string | undefined
    floorId?: string | undefined
    roomId?: string | undefined
    status?: ProjectorStatus | undefined
}

interface ListProjectorsUseCaseResponse {
    projectors: ProjectorWithRoom[]
}

export class ListProjectorsUseCase {
    constructor(
        private projectorsRepository: ProjectorsRepository,
        private usersRepository: UsersRepository,
    ) {}

    async execute({ userId, buildingId, floorId, roomId, status }: ListProjectorsUseCaseRequest): Promise<ListProjectorsUseCaseResponse> {
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

        const projectors = await this.projectorsRepository.findManyWithRoomPaginated({ 
            buildingIds,
            floorIds: floorId ? [floorId] : undefined,
            roomIds: roomId ? [roomId] : undefined, 
            status, 
        })

        return { projectors, }
    }
}