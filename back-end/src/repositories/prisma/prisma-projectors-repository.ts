import type { Projector } from "../../entities/projector";
import type { ProjectorWhereInput } from "../../generated/prisma/models";
import { prisma } from "../../lib/prisma";
import { PrismaProjectorMapper } from "../../mappers/prisma-projector-mapper";
import type { ProjectorFilters, ProjectorsRepository } from "../projectors-repository";

export class PrismaProjectorsRepository implements ProjectorsRepository {
    async create(projector: Projector): Promise<void> {
        const data = PrismaProjectorMapper.toPrisma(projector)

        await prisma.projector.create({ data, })
    }

    async findById(id: string): Promise<Projector | null> {
        const projector = await prisma.projector.findUnique({ where: { id }, })

        if(!projector) {
            return null
        }

        return PrismaProjectorMapper.toDomain(projector)
    }

    async findMany(filters: ProjectorFilters): Promise<Projector[]> {
        let where: ProjectorWhereInput = {}

        if(filters.roomIds) {
            where.roomId = { in: filters.roomIds }
        }

        if(filters.status) {
            where.status = filters.status
        }

        const projectors = await prisma.projector.findMany({ where, })

        return projectors.map(PrismaProjectorMapper.toDomain)
    }

    async save(projector: Projector): Promise<void> {
        const data = PrismaProjectorMapper.toPrisma(projector)

        await prisma.projector.update({
            where: { id: projector.id },
            data,
        })
    }

    async delete(projector: Projector): Promise<void> {
        await prisma.projector.delete({
            where: { id: projector.id },
        })
    }
}