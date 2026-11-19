import { type Request, type Response } from 'express'
import { SelectUsersUseCase } from '@domain/use-cases/select-users-use-case';
import { PrismaUsersRepository } from '../../prisma/repositories/prisma-users-repository';
import { UserPresenter } from '../presenters/user-presenter';
import { selectUsersQuerySchema } from '../schemas/users';

export class SelectUsersController {
    public async handle(req: Request, res: Response) {
        const usersRepository = new PrismaUsersRepository()

        const selectUsers = new SelectUsersUseCase(usersRepository)

        const { name, email, role } = selectUsersQuerySchema.parse(req.query)

        const result = await selectUsers.execute({ name, email, role })

        res.status(200).json(result.users.map(UserPresenter.toSelect))
    }
}