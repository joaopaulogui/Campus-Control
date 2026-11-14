import { type Request, type Response } from "express";
import { PrismaRoomsRepository } from "../../prisma/repositories/prisma-rooms-repository";
import { PrismaAirConditionersRepository } from "../../prisma/repositories/prisma-air-conditioners-repository";
import { PrismaProjectorsRepository } from "../../prisma/repositories/prisma-projectors-repository";
import { GetRoomDetailsUseCase } from "@domain/use-cases/get-room-details";
import { getRoomDetailsParamsSchema } from "../schemas/rooms";
import { RoomsPresenter } from "../presenters/room-presenter";

export class GetRoomDetailsController {
    async handle(req: Request, res: Response) {
        const roomsRepository = new PrismaRoomsRepository()
        const airConditionersRepository = new PrismaAirConditionersRepository()
        const projectorsRepository = new PrismaProjectorsRepository()

        const getRoomDetails = new GetRoomDetailsUseCase(
            roomsRepository,
            airConditionersRepository,
            projectorsRepository
        )

        const { roomId } = getRoomDetailsParamsSchema.parse(req.params)

        const { room, airConditioners, projectors } = await getRoomDetails.execute({ roomId })

        res.status(200).json(RoomsPresenter.toHttpDetailed(room, airConditioners, projectors))
    }
}