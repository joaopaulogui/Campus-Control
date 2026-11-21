import { type Request, type Response } from 'express'
import { ListUsersUseCase } from '@domain/use-cases/list-users-use-case';
import { PrismaUsersRepository } from '../../prisma/repositories/prisma-users-repository';
import { UserPresenter } from '../presenters/user-presenter';
import { selectUsersQuerySchema } from '../schemas/users';

export class ListUsersController {
    public async handle(req: Request, res: Response) {
        const usersRepository = new PrismaUsersRepository()

        const listUsers = new ListUsersUseCase(usersRepository)

        const { name, email, role } = selectUsersQuerySchema.parse(req.query)

        const result = await listUsers.execute({ name, email, role })

        res.status(200).json(result.users.map(UserPresenter.toHttp))
    }
}