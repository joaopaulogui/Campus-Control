import { type Request, type Response } from 'express'
import { ListRoomsUseCase } from '@domain/use-cases/list-rooms-use-case';
import { PrismaRoomsRepository } from '../../prisma/repositories/prisma-rooms-repository';
import { RoomsPresenter } from '../presenters/room-presenter';
import { listRoomsQuerySchema } from '../schemas/rooms';
import { PrismaUsersRepository } from '@/infra/prisma/repositories/prisma-users-repository';

export class ListRoomsController {
    public async handle(req: Request, res: Response) {
        const roomsRepository = new PrismaRoomsRepository()
        const usersRepository = new PrismaUsersRepository()

        const listRooms = new ListRoomsUseCase(roomsRepository, usersRepository)

        const { buildingId, floorId, name, type, isLocked, page, perPage } = listRoomsQuerySchema.parse(req.query)
        
        const result = await listRooms.execute({ 
            userId: req.user!.sub,
            buildingId, 
            floorId, 
            name, 
            type, 
            isLocked, 
            page, 
            perPage 
        })

        res.status(200).json(result.rooms.map(RoomsPresenter.toHTTP))
    }
}