import { Prisma } from "@/generated/prisma/client";

export const floorWithBuildingInclude = {
    building: {
        select: {
            name: true
        }
    }
} as const satisfies Prisma.FloorInclude

export type PrismaFloorWithBuilding = Prisma.FloorGetPayload<{ include: typeof floorWithBuildingInclude }>