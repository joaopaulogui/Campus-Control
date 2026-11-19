import type { Prisma } from "@generated/prisma/client";

export const roomContextInclude = {
    airConditioners: true,
    projectors: true,
    floor: {
        select: { 
            name: true, 
            buildingId: true,
            building: {
                select: {
                    name: true,
                }
            }
        },
    }
} as const satisfies Prisma.RoomInclude

export type PrismaRoomContext = Prisma.RoomGetPayload<{ include: typeof roomContextInclude }>