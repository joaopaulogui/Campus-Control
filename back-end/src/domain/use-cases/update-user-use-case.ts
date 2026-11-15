import type { HashGenerator } from "../cryptography/hash-generator"
import type { UserRole } from "../entities/user"
import type { BuildingsRepository } from "../repositories/buildings-repository"
import type { UsersRepository } from "../repositories/users-repositoy"

interface UpdateUserUseCaseRequest {
    userId: string
    adminId: string 
    name?: string | undefined
    email?: string | undefined
    password?: string | undefined
    role?: UserRole | undefined
    buildingIds?: string[] | undefined
}

interface UpdateUserUseCaseResponse {}

export class UpdateUserUseCase {
    constructor(
        private usersRepository: UsersRepository,
        private hashGenerator: HashGenerator,
        private buildingsRepository: BuildingsRepository
    ) {}

    async execute({ userId, adminId, buildingIds, email, name, password, role }: UpdateUserUseCaseRequest): Promise<UpdateUserUseCaseResponse> {
        const user = await this.usersRepository.findById(userId)

        if(!user) {
            throw new Error()
        }

        if(name) {
            user.name = name
        }

        if(email) {
            user.email = email
        }

        if(password) {
            user.password = await this.hashGenerator.hash(password)
        }

        if(role) {
            user.role = role
        }

        if(buildingIds) {
            const uniqueIds = [...new Set(buildingIds)]

            const buildings = await this.buildingsRepository.findMany({ ids: uniqueIds })

            if(uniqueIds.length !== buildings.length) {
                const foundIds = buildings.map((building) => building.id)

                const missingIds = uniqueIds.filter((id) => !foundIds.includes(id))

                throw new Error("Buildings not found:" + missingIds.map((id) => ` ${id}`))
            }

            user.buildingIds = buildingIds
        }

        await this.usersRepository.save(user)
        
        return {}
    }
}