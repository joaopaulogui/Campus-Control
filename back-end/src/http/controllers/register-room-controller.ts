import { type Request, type Response } from 'express'
import { PrismaFloorsRepository } from '../../repositories/prisma/prisma-floors-repository';
import { PrismaRoomsRepository } from '../../repositories/prisma/prisma-rooms-repository';
import { RegisterRoomUseCase } from '../../use-cases/register-room-use-case';
import { registerRoomBodySchema } from '../schemas/rooms';

export class RegisterRoomController {
    async handle(req: Request, res: Response) {
        const floorsRepository = new PrismaFloorsRepository()
        const roomsRepository = new PrismaRoomsRepository()

        const registerRoom = new RegisterRoomUseCase(roomsRepository, floorsRepository)

        const { name, type, capacity, floorId } = registerRoomBodySchema.parse(req.body)

        await registerRoom.execute({ name, type, capacity, floorId })

        res.status(201).send()
    }
}