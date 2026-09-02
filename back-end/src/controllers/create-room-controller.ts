import { type Request, type Response } from 'express'
import { z } from "zod";
import { RoomType } from "../entities/room";
import { PrismaFloorsRepository } from '../repositories/prisma/prisma-floors-repository';
import { PrismaRoomsRepository } from '../repositories/prisma/prisma-rooms-repository';
import { CreateRoomUseCase } from '../use-cases/create-room-use-case';

const CreateRoomParamsSchema = z.object({
    floorId: z.uuid()
})

const CreateRoomBodySchema = z.object({
    name: z.string(),
    type: z.enum(RoomType),
    capacity: z.int(),
})

export class CreateRoomController {
    async handle(req: Request, res: Response) {
        const floorsRepository = new PrismaFloorsRepository()
        const roomsRepository = new PrismaRoomsRepository()

        const createRoom = new CreateRoomUseCase(roomsRepository, floorsRepository)

        const { name, type, capacity } = CreateRoomBodySchema.parse(req.body)

        const { floorId } = CreateRoomParamsSchema.parse(req.params)

        await createRoom.execute({ name, type, capacity, floorId })

        res.status(201).send()
    }
}