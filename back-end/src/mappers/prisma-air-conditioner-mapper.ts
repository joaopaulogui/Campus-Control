import { AirConditioner, AirConditionerStatus as DomainAirConditionerStatus } from "../entities/air-conditioner";
import { Prisma, type AirConditioner as PrismaAirConditioner, AirConditionerStatus as PrismaAirConditionerStatus } from "../generated/prisma/client";

export class PrismaAirConditionerMapper {
    static toDomain(raw: PrismaAirConditioner): AirConditioner {
        const mappedStatus = DomainAirConditionerStatus[raw.status as keyof typeof DomainAirConditionerStatus]
        
        return new AirConditioner({
            status: mappedStatus,
            temperature: raw.temperature,
            isOn: raw.isOn,
            roomId: raw.roomId,
        }, raw.id)
    }

    static toPrisma(airConditioner: AirConditioner): Prisma.AirConditionerUncheckedCreateInput {
        const mappedStatus = PrismaAirConditionerStatus[airConditioner.status as keyof typeof PrismaAirConditionerStatus]

        return {
            id: airConditioner.id,
            roomId: airConditioner.roomId,
            status: mappedStatus,
            temperature: airConditioner.temperature,
            isOn: airConditioner.isOn,
        }
    }
}