import { User, type UserRole } from "../entities/user"
import type { UsersRepository } from "../repositories/users-repositoy"
import type { HashGenerator } from "../cryptography/hash-generator"
import { UserRegisteredEvent } from "../events/user-registered-event"
import { UserReactivatedEvent } from "../events/user-reactivated-event"

interface RegisterUserUseCaseRequest {
    adminId: string
    name: string
    email: string
    password: string
    role: UserRole
    buildingIds?: string[] | undefined
}

interface RegisterUserUseCaseResponse {}

export class RegisterUserUseCase {
    constructor(
        private usersRepository: UsersRepository,
        private hashGenerator: HashGenerator,
    ) {}

    async execute({ adminId, name, email, password, role, buildingIds }: RegisterUserUseCaseRequest): Promise<RegisterUserUseCaseResponse> {
        const userWithSameEmail = await this.usersRepository.findByEmail(email)

        if(userWithSameEmail) {
            if(!userWithSameEmail.deletedAt) {
                throw new Error()
            } else {
                const hashedPassword = await this.hashGenerator.hash(password)

                console.log(await this.hashGenerator.hash(""))

                userWithSameEmail.addDomainEvent(new UserReactivatedEvent(userWithSameEmail, adminId))

                userWithSameEmail.name = name
                userWithSameEmail.email = email
                userWithSameEmail.password = hashedPassword
                userWithSameEmail.role = role
                userWithSameEmail.buildingIds = buildingIds ?? []
                userWithSameEmail.reactivate()

                await this.usersRepository.save(userWithSameEmail)

                return {}
            }
        }
 
        const hashedPassword = await this.hashGenerator.hash(password)

        const user = new User({
            name,
            email,
            password: hashedPassword,
            role,
            buildingIds: buildingIds ?? [],
            createdAt: new Date()
        })

        user.addDomainEvent(new UserRegisteredEvent(user, adminId))

        await this.usersRepository.create(user)

        return {}
    }
}