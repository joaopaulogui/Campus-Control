import { type Request, type Response } from 'express'
import { ListRoomsUseCase } from '@domain/use-cases/list-rooms-use-case';
import { PrismaFloorsRepository } from '../../prisma/repositories/prisma-floors-repository';
import { PrismaRoomsRepository } from '../../prisma/repositories/prisma-rooms-repository';
import { RoomsPresenter } from '../presenters/room-presenter';
import { listRoomsQuerySchema } from '../schemas/rooms';

export class ListRoomsController {
    public async handle(req: Request, res: Response) {
        const floorsRepository = new PrismaFloorsRepository()
        const roomsRepository = new PrismaRoomsRepository()

        const listRooms = new ListRoomsUseCase(floorsRepository, roomsRepository)

        const { buildingId, floorId, name, type, isLocked, page, perPage } = listRoomsQuerySchema.parse(req.query)
        
        const result = await listRooms.execute({ buildingId, floorId, name, type, isLocked, page, perPage })

        res.status(200).json(result.rooms.map(RoomsPresenter.toHTTP))
    }
}