import { type Request, type Response } from "express";
import { PrismaAirConditionersRepository } from "../../prisma/repositories/prisma-air-conditioners-repository";
import { ListAirConditionersUseCase } from "@/domain/use-cases/list-air-conditioners-use-case";
import { AirConditionerPresenter } from "../presenters/air-conditioners-presenter";
import { listAirConditionersQuerySchema } from "../schemas/air-conditioners";
import { PrismaUsersRepository } from "@/infra/prisma/repositories/prisma-users-repository";

export class ListAirConditionersController {
    async handle(req: Request, res: Response) {
        const airConditionersRepository = new PrismaAirConditionersRepository()
        const usersRepository = new PrismaUsersRepository()

        const listAirConditionersUseCase = new ListAirConditionersUseCase(
            airConditionersRepository, 
            usersRepository
        )

        const { buildingId, floorId, roomId, status } = listAirConditionersQuerySchema.parse(req.query)

        const { airConditioners } = await listAirConditionersUseCase.execute({ 
            userId: req.user!.sub,
            buildingId, 
            floorId, 
            roomId, 
            status 
        })

        res.status(200).json(airConditioners.map(AirConditionerPresenter.toHTTP))
    }
}