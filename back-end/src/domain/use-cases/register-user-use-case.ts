import { User, type UserRole } from "../entities/user"
import type { UsersRepository } from "../repositories/users-repositoy"
import type { HashGenerator } from "../cryptography/hash-generator"

interface RegisterUserUseCaseRequest {
    name: string
    email: string
    password: string
    role: UserRole
}

interface RegisterUserUseCaseResponse {}

export class RegisterUserUseCase {
    constructor(
        private usersRepository: UsersRepository,
        private hashGenerator: HashGenerator,
    ) {}

    async execute({ name, email, password, role }: RegisterUserUseCaseRequest): Promise<RegisterUserUseCaseResponse> {
        const userWithSameEmail = await this.usersRepository.findByEmail(email)

        if(userWithSameEmail) {
            throw new Error()
        }
 
        const hashedPassword = await this.hashGenerator.hash(password)

        const user = new User({
            name,
            email,
            password: hashedPassword,
            role,
            createdAt: new Date()
        })

        await this.usersRepository.create(user)

        return {}
    }
}