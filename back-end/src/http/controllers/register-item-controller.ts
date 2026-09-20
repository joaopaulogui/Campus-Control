import { type Request, type Response } from "express";
import { PrismaItemsRepository } from "../../repositories/prisma/prisma-items-repository";
import { RegisterItemUseCase } from "../../use-cases/register-item-use-case";
import { RegisterItemBodySchema } from "../schemas/items";

export class RegisterItemController {
    async handle(req: Request, res: Response) {
        const itemsRepository = new PrismaItemsRepository()

        const registerItem = new RegisterItemUseCase(itemsRepository)

        const { name, type, totalQuantity } = RegisterItemBodySchema.parse(req.body)

        await registerItem.execute({ name, type, totalQuantity })

        res.status(204).send()
    }
}