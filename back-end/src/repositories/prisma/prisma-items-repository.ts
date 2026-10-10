import type { Item } from "../../entities/item";
import type { PaginationParams } from "../../entities/value-objects/pagination-params";
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
            where.name = {
                contains: filters.name,
                mode: "insensitive"
            }
        }

        if(filters?.type) {
            where.type = filters.type
        }

        const items = await prisma.item.findMany({
            where, 
            orderBy: {
                name: "asc"
            }
        })

        return items.map(PrismaItemMapper.toDomain)
    }

    async findManyPaginated(filters?: ItemFilter, params: PaginationParams = { page: 1, perPage: 30 }): Promise<Item[]> {
        let where: ItemWhereInput = {}

        if(filters?.name) {
            where.name = {
                contains: filters.name,
                mode: "insensitive"
            }
        }

        if(filters?.type) {
            where.type = filters.type
        }

        const items = await prisma.item.findMany({ 
            where, 
            orderBy: {
                name: "asc"
            },
            take: params.perPage,
            skip: (params.page - 1) * params.perPage
        })

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