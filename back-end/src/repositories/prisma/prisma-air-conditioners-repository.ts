import type { AirConditioner } from "../../entities/air-conditioner";
import { prisma } from "../../lib/prisma";
import { Prisma } from "../../generated/prisma/client"
import { PrismaAirConditionerMapper } from "../../mappers/prisma-air-conditioner-mapper";
import type { AirConditionerFilters, AirConditionersRepository } from "../air-conditioners-repository";

export class PrismaAirConditionersRepository implements AirConditionersRepository {
    async create(airConditioner: AirConditioner): Promise<void> {
        const data = PrismaAirConditionerMapper.toPrisma(airConditioner)

        await prisma.airConditioner.create({ data, })
    }

    async findById(id: string): Promise<AirConditioner | null> {
        const airConditioner = await prisma.airConditioner.findUnique({
            where: { id, }
        })

        if(!airConditioner) {
            return null
        }

        return PrismaAirConditionerMapper.toDomain(airConditioner)
    }

    async findMany(filters: AirConditionerFilters): Promise<AirConditioner[]> {
        const where: Prisma.AirConditionerWhereInput = {}

        if(filters.roomId) {
            where.roomId = filters.roomId
        }

        if(filters.status) {
            where.status = filters.status
        }

        const airConditioners = await prisma.airConditioner.findMany({
            where,
            orderBy: { id: "asc" },
        })

        return airConditioners.map(PrismaAirConditionerMapper.toDomain)
    }

    async save(airConditioner: AirConditioner): Promise<void> {
        const data = PrismaAirConditionerMapper.toPrisma(airConditioner)

        await prisma.airConditioner.update({
            where: { id: data.id! },
            data,
        })
    }

    async delete(airConditioner: AirConditioner): Promise<void> {
        const data = PrismaAirConditionerMapper.toPrisma(airConditioner)

        await prisma.airConditioner.delete({
            where: { id: data.id! },
        })
    }
}