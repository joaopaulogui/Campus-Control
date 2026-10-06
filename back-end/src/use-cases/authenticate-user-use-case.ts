import type { UsersRepository } from "../repositories/users-repositoy.js";
import type { HashComparer } from "../cryptography/hash-comparer.js";
import type { Encrypter } from "../cryptography/encrypter.js";

interface AuthenticateUserUseCaseRequest {
    email: string
    password: string
}

interface AuthenticateUserUseCaseResponse {
    accessToken: string
}

export class AuthenticateUserUseCase {
    constructor(
        private usersRepository: UsersRepository,
        private hashComparer: HashComparer,
        private encrypter: Encrypter,
    ) {}

    async execute({ email, password }: AuthenticateUserUseCaseRequest): Promise<AuthenticateUserUseCaseResponse> {
        const user = await this.usersRepository.findByEmail(email)

        if(!user) {
            throw new Error()
        }

        const isPasswordValid = await this.hashComparer.compare(password, user.password)

        if(!isPasswordValid) {
            throw new Error()
        }

        const accessToken = await this.encrypter.encrypt({
            sub: user.id,
            role: user.role
        })

        return { accessToken, }
    }
}