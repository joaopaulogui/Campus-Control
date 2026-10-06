import { type Request, type Response } from "express";
import { PrismaItemsRepository } from "../../repositories/prisma/prisma-items-repository";
import { PrismaLoansRepository } from "../../repositories/prisma/prisma-loans-repository";
import { ListLoansUseCase } from "../../use-cases/list-loans-use-case";
import { listLoansQuerySchema } from "../schemas/loans";
import { LoanPresenter } from "../presenters/loan-presenter";

export class ListLoansController {
    async handle(req: Request, res: Response) {
        const itemsRepository = new PrismaItemsRepository()
        const loansRepository = new PrismaLoansRepository()

        const listLoans = new ListLoansUseCase(itemsRepository, loansRepository)

        const { itemName, responsibleName, status } = listLoansQuerySchema.parse(req.query) 

        const { loans } = await listLoans.execute({ responsibleName, itemName, status })

        res.status(200).json(loans.map(LoanPresenter.toHTTPWithItem))
    }
}