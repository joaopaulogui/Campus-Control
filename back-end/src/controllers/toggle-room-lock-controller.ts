import { type Request, type Response } from "express"
import { z } from "zod";
import { PrismaRoomsRepository } from "../repositories/prisma/prisma-rooms-repository";
import { ToggleRoomLockUseCase } from "../use-cases/toggle-room-lock-use-case";

const ToggleRoomLockParamsSchema = z.object({
    roomId: z.uuid()
})

export class ToggleRoomLockController {
    async handle(req: Request, res: Response) {
        const roomsRepository = new PrismaRoomsRepository()

        const toggleRoomLock = new ToggleRoomLockUseCase(roomsRepository)

        const { roomId } = ToggleRoomLockParamsSchema.parse(req.params)

        await toggleRoomLock.execute({ roomId, })

        res.status(200).send()
    }
}