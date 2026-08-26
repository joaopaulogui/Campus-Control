import type { UsersRepository } from "../repositories/users-repositoy.js";

interface AuthenticateUserUseCaseRequest {
    email: string
    password: string
}

interface AuthenticateUserUseCaseResponse {}

export class AuthenticateUserUseCase {
    constructor(private usersRepository: UsersRepository) {}

    async execute({ email, password }: AuthenticateUserUseCaseRequest): Promise<AuthenticateUserUseCaseResponse> {
        const user = await this.usersRepository.findByEmail(email)

        if(!user) {
            throw new Error()
        }

        if(user.password !== password) {
            throw new Error()
        }

        return {}
    }
}