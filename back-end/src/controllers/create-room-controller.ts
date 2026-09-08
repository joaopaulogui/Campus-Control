import { type Request, type Response } from 'express'
import { PrismaFloorsRepository } from '../repositories/prisma/prisma-floors-repository';
import { PrismaRoomsRepository } from '../repositories/prisma/prisma-rooms-repository';
import { CreateRoomUseCase } from '../use-cases/create-room-use-case';
import { createRoomBodySchema } from '../http/schemas/rooms';

export class CreateRoomController {
    async handle(req: Request, res: Response) {
        const floorsRepository = new PrismaFloorsRepository()
        const roomsRepository = new PrismaRoomsRepository()

        const createRoom = new CreateRoomUseCase(roomsRepository, floorsRepository)

        const { name, type, capacity, floorId } = createRoomBodySchema.parse(req.body)

        await createRoom.execute({ name, type, capacity, floorId })

        res.status(201).send()
    }
}