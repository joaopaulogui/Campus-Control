import type { AirConditionerStatus } from "../entities/air-conditioner.js"
import { UserRole } from "../entities/user.js"
import type { AirConditionerWithRoom } from "../entities/value-objects/air-conditioner-with-room.js"
import type { AirConditionersRepository } from "../repositories/air-conditioners-repository.js"
import type { UsersRepository } from "../repositories/users-repositoy.js"

interface ListAirConditionersUseCaseRequest {
    userId: string
    buildingId?: string | undefined
    floorId?: string | undefined
    roomId?: string | undefined
    status?: AirConditionerStatus | undefined
}

interface ListAirConditionersUseCaseResponse {
    airConditioners: AirConditionerWithRoom[]
}

export class ListAirConditionersUseCase {
    constructor(
        private airConditionersRepository: AirConditionersRepository,
        private usersRepository: UsersRepository,
    ) {}

    async execute({ userId, buildingId, floorId, roomId, status }: ListAirConditionersUseCaseRequest): Promise<ListAirConditionersUseCaseResponse> {
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

        const airConditioners = await this.airConditionersRepository.findManyWithRoomPaginated({ 
            buildingIds,
            floorIds: floorId ? [floorId] : undefined,
            roomIds: roomId ? [roomId] : undefined, 
            status, 
        })

        return { airConditioners, }
    }
}