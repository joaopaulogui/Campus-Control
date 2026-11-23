import { prisma } from "../src/infra/prisma/lib/prisma"
import { PrismaUsersRepository } from "../src/infra/prisma/repositories/prisma-users-repository"
import { RegisterUserUseCase } from "../src/domain/use-cases/register-user-use-case"
import { BcryptHasher } from "../src/infra/cryptography/bcrypt/bcrypt-hasher"
import { UserRole } from "../src/domain/entities/user"

async function main() {
    const email = "admin@admin.com"

    const exists = await prisma.user.findUnique({ where: { email } })

    if(exists) {
        return;    
    }

    const usersRepository = new PrismaUsersRepository()
    const hasher = new BcryptHasher()
    const registerUser = new RegisterUserUseCase(usersRepository, hasher)

    await registerUser.execute({ adminId: "", name: "Admin", email, password: "1234", role: UserRole.ADMIN, buildingIds:[] })

    console.log("Default user created")
}

main().catch((e) => {
    console.log(e)
    process.exit(1)
}).finally(() => prisma.$disconnect())


