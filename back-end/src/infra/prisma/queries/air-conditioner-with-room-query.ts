import type { Prisma } from "@/generated/prisma/client";

export const airConditionerWithRoomInclude =  {
    room: {
        select: {
            name: true
        }
    }
} as const satisfies Prisma.AirConditionerInclude

export type PrismaAirConditionerWithRoom = Prisma.AirConditionerGetPayload<{ 
    include: typeof airConditionerWithRoomInclude 
}>