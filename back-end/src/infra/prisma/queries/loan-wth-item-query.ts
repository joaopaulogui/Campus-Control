import type { Prisma } from "@/generated/prisma/client";

export const loanWithItemInclude = {
    item: {
        select: {
            name: true
        }
    }
} as const satisfies Prisma.LoanInclude

export type PrismaLoanWithItem = Prisma.LoanGetPayload<{ include: typeof loanWithItemInclude }>