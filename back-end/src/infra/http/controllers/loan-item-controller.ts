import { type Request, type Response } from "express";
import { PrismaItemsRepository } from "../../prisma/repositories/prisma-items-repository";
import { PrismaLoansRepository } from "../../prisma/repositories/prisma-loans-repository";
import { LoanItemUseCase } from "@domain/use-cases/loan-item-use-case";
import { LoanItemBodySchema } from "../schemas/loans";

export class LoanItemController {
    async handle(req: Request, res: Response) {
        const itemsRepository = new PrismaItemsRepository()
        const loansRepository = new PrismaLoansRepository()

        const loanItem = new LoanItemUseCase(itemsRepository, loansRepository)

        const { 
            responsibleName, 
            responsibleRegistration, 
            itemId,  
            quantity,
            deadline
        } = LoanItemBodySchema.parse(req.body)

        await loanItem.execute({
            responsibleName,
            responsibleRegistration,
            itemId,
            quantity,
            deadline: new Date(deadline)
        })

        res.status(201).send()
    }
}