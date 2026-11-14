import { type Request, type Response } from "express";
import { PrismaLoansRepository } from "../../prisma/repositories/prisma-loans-repository";
import { PrismaItemsRepository } from "../../prisma/repositories/prisma-items-repository";
import { ReturnItemUseCase } from "@domain/use-cases/return-item-use-case";
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