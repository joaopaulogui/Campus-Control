import { type Request, type Response } from "express";
import { PrismaItemsRepository } from "../../repositories/prisma/prisma-items-repository";
import { DeleteItemUseCase } from "../../use-cases/delete-item-use-case";
import { deleteItemParamsSchema } from "../schemas/items";

export class DeleteItemController {
    async handle(req: Request, res: Response) {
        const itemsRepository = new PrismaItemsRepository()

        const deleteItem = new DeleteItemUseCase(itemsRepository)

        const { itemId } = deleteItemParamsSchema.parse(req.params)

        await deleteItem.execute({ itemId })

        res.status(204).send()
    }
}