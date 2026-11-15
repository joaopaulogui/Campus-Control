import { UpdateUserUseCase } from "@/domain/use-cases/update-user-use-case"
import { BcryptHasher } from "@/infra/cryptography/bcrypt/bcrypt-hasher"
import { PrismaBuildingsRepository } from "@/infra/prisma/repositories/prisma-buildings-repository"
import { PrismaUsersRepository } from "@/infra/prisma/repositories/prisma-users-repository"
import { type Request, type Response } from "express"
import { updateUserBodySchema, updateUserParamsSchema } from "../schemas/users"

export class UpdateUserController {
    async handle(req: Request, res: Response) {
        const usersRepository = new PrismaUsersRepository()
        const hasher = new BcryptHasher()
        const buildingsRepository = new PrismaBuildingsRepository()

        const updateUser = new UpdateUserUseCase(usersRepository, hasher, buildingsRepository)

        const { userId } = updateUserParamsSchema.parse(req.params)

        const { name, email, password, role, buildingIds } = updateUserBodySchema.parse(req.body)

        await updateUser.execute({ adminId: req.user!.sub, userId, name, email, password, role, buildingIds })

        res.status(204).send()
    }
}