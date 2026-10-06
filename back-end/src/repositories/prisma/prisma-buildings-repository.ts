import type { Building } from "../../entities/building";
import type { Prisma } from "../../generated/prisma/client";
import { prisma } from "../../lib/prisma";
import { PrismaBuildingMapper } from "../../mappers/prisma-building-mapper";
import type { BuildingFilters, BuildingsRepository } from "../buildings-repository";

export class PrismaBuildingsRepository implements BuildingsRepository {
    async create(building: Building): Promise<void> {
        const data = PrismaBuildingMapper.toPrisma(building)

        await prisma.building.create({ data, })
    }

    async findById(id: string): Promise<Building | null> {
        const building = await prisma.building.findUnique({
            where: {
                id,
            }
        })

        if(!building) {
            return null
        }

        return PrismaBuildingMapper.toDomain(building)
    }

    async findMany(filters?: BuildingFilters): Promise<Building[]> {
        const where: Prisma.BuildingWhereInput = {}

        if(filters?.id) {
            where.id = filters.id
        }

        const buildings = await prisma.building.findMany({ 
            where, 
            orderBy: {
                name: "asc"
            }
        })

        return buildings.map(PrismaBuildingMapper.toDomain)
    }

    async save(building: Building): Promise<void> {
        const data = PrismaBuildingMapper.toPrisma(building)

        await prisma.building.update({
            where: { id: data.id! },
            data,
        })
    }

    async delete(building: Building): Promise<void> {
        await prisma.building.delete({
            where: { id: building.id },
        })
    }
}