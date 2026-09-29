import { type Request, type Response } from "express";
import { PrismaLoansRepository } from "../../repositories/prisma/prisma-loans-repository";
import { PrismaItemsRepository } from "../../repositories/prisma/prisma-items-repository";
import { ReturnItemUseCase } from "../../use-cases/return-item-use-case";
import { returnItemParamsSchema } from "../schemas/loans";

export class ReturnItemController {
    async handle(req: Request, res: Response) {
        const loansRepository = new PrismaLoansRepository()
        const itemsRepository = new PrismaItemsRepository()

        const returnItem = new ReturnItemUseCase(loansRepository, itemsRepository)

        const { loanId } = returnItemParamsSchema.parse(req.params)

        await returnItem.execute({ loanId })

        res.status(204).send()
    }
}