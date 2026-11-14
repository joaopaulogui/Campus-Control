import { GetUserProfileUseCase } from "@/domain/use-cases/get-user-profile-use-case"
import { PrismaBuildingsRepository } from "@/infra/prisma/repositories/prisma-buildings-repository"
import { PrismaUsersRepository } from "@/infra/prisma/repositories/prisma-users-repository"
import { type Request, type Response } from "express"
import { UserPresenter } from "../presenters/user-presenter"

export class GetUserProfileController {
    async handle(req: Request, res: Response) {
        const usersRepository = new PrismaUsersRepository()
        const buildingsRepository = new PrismaBuildingsRepository()

        const getUserProfile = new GetUserProfileUseCase(usersRepository, buildingsRepository)

        const { user, buildings } = await getUserProfile.execute({ userId: req.user!.sub })

        res.status(200).json(UserPresenter.toHttpWithBuildings(user, buildings))
    }
}