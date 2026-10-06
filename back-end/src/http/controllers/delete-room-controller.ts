import { type Request, type Response } from "express";
import { PrismaRoomsRepository } from "../../repositories/prisma/prisma-rooms-repository";
import { DeleteRoomUseCase } from "../../use-cases/delete-room-use-case";
import { deleteRoomParamsSchema } from "../schemas/rooms";

export class DeleteRoomController {
    async handle(req: Request, res: Response) {
        const roomsRepository = new PrismaRoomsRepository()

        const deleteRoom = new DeleteRoomUseCase(roomsRepository)

        const { roomId } = deleteRoomParamsSchema.parse(req.params)

        await deleteRoom.execute({ roomId })

        res.status(204).send()
    }
}