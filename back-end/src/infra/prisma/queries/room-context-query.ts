import type { Prisma } from "@generated/prisma/client";

export const roomContextInclude = {
    airConditioners: {
        orderBy: { id: "asc" }
    },
    projectors: {
        orderBy: { id: "asc" }
    },
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