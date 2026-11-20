import { type Request, type Response } from "express";
import { PrismaRoomsRepository } from "../../prisma/repositories/prisma-rooms-repository";
import { PrismaAirConditionersRepository } from "../../prisma/repositories/prisma-air-conditioners-repository";
import { PrismaProjectorsRepository } from "../../prisma/repositories/prisma-projectors-repository";
import { GetRoomDetailsUseCase } from "@domain/use-cases/get-room-details";
import { getRoomDetailsParamsSchema } from "../schemas/rooms";
import { RoomsPresenter } from "../presenters/room-presenter";
import { PrismaUsersRepository } from "@/infra/prisma/repositories/prisma-users-repository";

export class GetRoomDetailsController {
    async handle(req: Request, res: Response) {
        const roomsRepository = new PrismaRoomsRepository()
        const usersRepository = new PrismaUsersRepository()

        const getRoomDetails = new GetRoomDetailsUseCase( roomsRepository, usersRepository )

        const { roomId } = getRoomDetailsParamsSchema.parse(req.params)

        const { room } = await getRoomDetails.execute({ userId: req.user!.sub, roomId })

        res.status(200).json(RoomsPresenter.toHttpContext(room))
    }
}