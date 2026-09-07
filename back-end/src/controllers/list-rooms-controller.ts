import { type Request, type Response } from 'express'
import { ListRoomsUseCase } from '../use-cases/list-rooms-use-case';
import { PrismaFloorsRepository } from '../repositories/prisma/prisma-floors-repository';
import { PrismaRoomsRepository } from '../repositories/prisma/prisma-rooms-repository';
import { z } from 'zod';
import { RoomsPresenter } from '../presenters/room-presenter';

const listRoomsQuerySchema = z.object({
    buildingId: z.uuid(),
    floorId: z.uuid().optional(),
})

export class ListRoomsController {
    public async handle(req: Request, res: Response) {
        const floorsRepository = new PrismaFloorsRepository()
        const roomsRepository = new PrismaRoomsRepository()

        const listRooms = new ListRoomsUseCase(floorsRepository, roomsRepository)

        const { buildingId, floorId } = listRoomsQuerySchema.parse(req.query)
        
        const result = await listRooms.execute({ buildingId, floorId, })

        console.log(result.rooms)

        res.status(200).json(result.rooms.map(RoomsPresenter.toHTTP))
    }
}