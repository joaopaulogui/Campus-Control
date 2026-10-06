import { type Request, type Response } from "express"
import { PrismaRoomsRepository } from "../../repositories/prisma/prisma-rooms-repository"
import { UpdateRoomUseCase } from "../../use-cases/update-room-use-case"
import { updateRoomBodySchema, updateRoomParamsSchema } from "../schemas/rooms"

export class UpdateRoomController {
    async handle(req: Request, res: Response) {
        const roomsRepository = new PrismaRoomsRepository()

        const updateRoom = new UpdateRoomUseCase(roomsRepository)

        const { roomId } = updateRoomParamsSchema.parse(req.params)
        const { name, type, capacity } = updateRoomBodySchema.parse(req.body)

        await updateRoom.execute({ roomId, name, type, capacity })

        res.status(204).send()
    }
}