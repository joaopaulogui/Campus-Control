import type { Prisma } from "@/generated/prisma/client";

export const projectorWithRoomInclude = {
    room: {
        select: {
            name: true,
        }
    }
} as const satisfies Prisma.ProjectorInclude

export type PrismaProjectorWithRoom = Prisma.ProjectorGetPayload<{ include: typeof projectorWithRoomInclude }>