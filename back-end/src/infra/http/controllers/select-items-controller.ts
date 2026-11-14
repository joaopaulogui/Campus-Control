import { type Request, type Response } from "express";
import { PrismaItemsRepository } from "../../prisma/repositories/prisma-items-repository";
import { ListItemsUseCase } from "@domain/use-cases/list-items-use-case";
import { listItemsQuerySchema } from "../schemas/items";
import { ItemPresenter } from "../presenters/item-presenter";

export class SelectItemsController {
    async handle(req: Request, res: Response) {
        const itemsRepository = new PrismaItemsRepository()

        const listItems = new ListItemsUseCase(itemsRepository)

        const { name, type, page, perPage } = listItemsQuerySchema.parse(req.query)

        const { items } = await listItems.execute({ name, type, page, perPage })

        res.status(200).json(items.map(ItemPresenter.toSelect))
    }
}