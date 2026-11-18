import { GetFloorByIdUseCase } from "@/domain/use-cases/get-floor-by-id-use-case";
import { PrismaFloorsRepository } from "@/infra/prisma/repositories/prisma-floors-repository";
import { PrismaUsersRepository } from "@/infra/prisma/repositories/prisma-users-repository";
import { type Request, type Response } from "express";
import { getFloorByIdParamsSchema } from "../schemas/floors";
import { FloorPresenter } from "../presenters/floor-presenter";

export class GetFloorByIdController {
    async handle(req: Request, res: Response) {
        const usersRepository = new PrismaUsersRepository()
        const floorsRepository = new PrismaFloorsRepository()

        const getFloorById = new GetFloorByIdUseCase(usersRepository, floorsRepository)

        const { floorId } = getFloorByIdParamsSchema.parse(req.params)

        const { floor } = await getFloorById.execute({ userId: req.user!.sub, floorId })

        res.status(200).json(FloorPresenter.toHttpWithBuilding(floor))
    }
}