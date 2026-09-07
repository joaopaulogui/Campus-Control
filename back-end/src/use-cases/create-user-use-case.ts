import { hash } from "bcryptjs"
import { User, type UserRole } from "../entities/user"
import type { UsersRepository } from "../repositories/users-repositoy"

interface CreateUserUseCaseRequest {
    name: string
    email: string
    password: string
    role: UserRole
}

interface CreateUserUseCaseResponse {}

export class CreateUserUseCase {
    constructor(private usersRepository: UsersRepository) {}

    async execute({ name, email, password, role }: CreateUserUseCaseRequest): Promise<CreateUserUseCaseResponse> {
        const userWithSameEmail = await this.usersRepository.findByEmail(email)

        if(userWithSameEmail) {
            throw new Error()
        }

        const hashedPassword = await hash(password, 8)

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