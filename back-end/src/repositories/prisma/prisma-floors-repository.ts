import type { Floor } from "../../entities/floor";
import { PrismaFloorMapper } from "../../mappers/prisma-floor-mapper";
import type { FloorFilters, FloorsRepository } from "../floors-repository";
import { prisma } from "../../lib/prisma";
import type { Prisma } from "../../generated/prisma/client";

export class PrismaFloorsRepository implements FloorsRepository {
    async create(floor: Floor): Promise<void> {
        const data = PrismaFloorMapper.toPrisma(floor)

        await prisma.floor.create({ data, })
    }

    async findById(id: string): Promise<Floor | null> {
        const floor = await prisma.floor.findUnique({ where: {id}, })
    
        if(!floor) {
            return null
        }
        
        return PrismaFloorMapper.toDomain(floor)
    }

    async findMany(filters: FloorFilters): Promise<Floor[]> {
        const where: Prisma.FloorWhereInput = {}

        if(filters?.id) {
            where.id = filters.id
        }

        const floors = await prisma.floor.findMany({
            where,
        })

        return floors.map(PrismaFloorMapper.toDomain)
    }

    async save(floor: Floor): Promise<void> {
        const data = PrismaFloorMapper.toPrisma(floor)

        await prisma.floor.update({
            where: { id: data.id! }, 
            data, 
        })
    }

    async delete(floor: Floor): Promise<void> {
        const data = PrismaFloorMapper.toPrisma(floor)

        await prisma.floor.delete({ 
            where: { id: data.id! }, 
        })
    }
}