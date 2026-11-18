import { type Request, type Response } from "express";
import { PrismaLoansRepository } from "../../prisma/repositories/prisma-loans-repository";
import { ListLoansUseCase } from "@domain/use-cases/list-loans-use-case";
import { listLoansQuerySchema } from "../schemas/loans";
import { LoanPresenter } from "../presenters/loan-presenter";

export class ListLoansController {
    async handle(req: Request, res: Response) {
        const loansRepository = new PrismaLoansRepository()

        const listLoans = new ListLoansUseCase(loansRepository)

        const { itemName, responsibleName, status, page, perPage } = listLoansQuerySchema.parse(req.query) 

        const { loans } = await listLoans.execute({ responsibleName, itemName, status, page, perPage })

        res.status(200).json(loans.map(LoanPresenter.toHTTPWithItem))
    }
}