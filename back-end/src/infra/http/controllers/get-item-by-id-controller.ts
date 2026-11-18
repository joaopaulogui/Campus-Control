import { GetItemByIdUseCase } from "@/domain/use-cases/get-item-by-id-use-case";
import { PrismaItemsRepository } from "@/infra/prisma/repositories/prisma-items-repository";
import { type Request, type Response } from "express";
import { getItemByIdParamsSchema } from "../schemas/items";
import { ItemPresenter } from "../presenters/item-presenter";

export class GetItemByIdController {
    async handle(req: Request, res: Response) {
        const itemsRepository = new PrismaItemsRepository()

        const getItemById = new GetItemByIdUseCase(itemsRepository)

        const { itemId } = getItemByIdParamsSchema.parse(req.params)

        const { item } = await getItemById.execute({ itemId })

        res.status(200).json(ItemPresenter.toHTTP(item))
    }
}