import type { Item } from "../../entities/item";
import type { ItemWhereInput } from "../../generated/prisma/models";
import { prisma } from "../../lib/prisma";
import { PrismaItemMapper } from "../../mappers/prisma-item-mapper";
import type { ItemFilter, ItemsRepository } from "../items-repository";

export class PrismaItemsRepository implements ItemsRepository {
    async create(item: Item): Promise<void> {
        const data = PrismaItemMapper.toPrisma(item)

        await prisma.item.create({ data, })
    }

    async findById(id: string): Promise<Item | null> {
        const item = await prisma.item.findUnique({ where: { id, } })

        if(!item) {
            return null
        }

        return PrismaItemMapper.toDomain(item)
    }

    async findMany(filters?: ItemFilter): Promise<Item[]> {
        let where: ItemWhereInput = {}

        if(filters?.name) {
            where.name = { contains: filters.name }
        }

        const items = await prisma.item.findMany({ where, })

        return items.map(PrismaItemMapper.toDomain)
    }

    async save(item: Item): Promise<void> {
        const data = PrismaItemMapper.toPrisma(item)
        
        await prisma.item.update({
            where: { id: item.id },
            data, 
        })
    }

    async delete(item: Item): Promise<void> {
        await prisma.item.delete({
            where: { id: item.id } 
        })
    }
}