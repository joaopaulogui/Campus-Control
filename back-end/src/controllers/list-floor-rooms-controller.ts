import { type Request, type Response } from 'express'
import { ListFloorRoomsUseCase } from '../use-cases/list-floor-rooms-use-case';
import { PrismaFloorsRepository } from '../repositories/prisma/prisma-floors-repository';
import { PrismaRoomsRepository } from '../repositories/prisma/prisma-rooms-repository';
import { z } from 'zod';
import { FloorWithRoomsPresenter } from '../presenters/floor-with-rooms-presenter';

const listFloorRoomsQuerySchema = z.object({
    floorId: z.uuid().optional()
})

export class ListFloorRoomsController {
    public async handle(req: Request, res: Response) {
        const floorsRepository = new PrismaFloorsRepository()
        const roomsRepository = new PrismaRoomsRepository()

        const listFloorRooms = new ListFloorRoomsUseCase(floorsRepository, roomsRepository)

        const { floorId } = listFloorRoomsQuerySchema.parse(req.query)

        const result = await listFloorRooms.execute({ floorId })

        res.status(200).json(result.floors.map(FloorWithRoomsPresenter.toHTTP))
    }
}