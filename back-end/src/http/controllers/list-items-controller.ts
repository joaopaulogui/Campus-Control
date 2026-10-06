import { type Request, type Response } from "express";
import { PrismaItemsRepository } from "../../repositories/prisma/prisma-items-repository";
import { ListItemsUseCase } from "../../use-cases/list-items-use-case";
import { listItemsQuerySchema } from "../schemas/items";
import { ItemPresenter } from "../presenters/item-presenter";

export class ListItemsController {
    async handle(req: Request, res: Response) {
        const itemsRepository = new PrismaItemsRepository()

        const listItems = new ListItemsUseCase(itemsRepository)

        const { name, type } = listItemsQuerySchema.parse(req.query)

        const { items } = await listItems.execute({ name, type })

        res.status(200).json(items.map(ItemPresenter.toHTTP))
    }
}