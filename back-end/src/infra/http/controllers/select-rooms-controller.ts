import { type Request, type Response } from 'express'
import { SelectRoomsUseCase } from '@domain/use-cases/select-rooms-use-case';
import { PrismaUsersRepository } from '../../prisma/repositories/prisma-users-repository';
import { PrismaRoomsRepository } from '../../prisma/repositories/prisma-rooms-repository';
import { RoomsPresenter } from '../presenters/room-presenter';
import { listRoomsQuerySchema } from '../schemas/rooms';

export class SelectRoomsController {
    public async handle(req: Request, res: Response) {
        const usersRepository = new PrismaUsersRepository()
        const roomsRepository = new PrismaRoomsRepository()

        const selectRooms = new SelectRoomsUseCase(roomsRepository, usersRepository)

        const { buildingId, floorId, name, type, isLocked, page, perPage } = listRoomsQuerySchema.parse(req.query)
        
        const result = await selectRooms.execute({ 
            userId: req.user!.sub, 
            buildingId, 
            floorId, 
            name, 
            type, 
            isLocked, 
            page, 
            perPage 
        })

        res.status(200).json(result.rooms.map(RoomsPresenter.toSelect))
    }
}