import { LoanStatus as DomainLoanStatus, Loan } from "../entities/loan";
import { Prisma, type Loan as PrismaLoan, LoanStatus as PrismaLoanStatus } from "../generated/prisma/client";

export class PrismaLoanMapper {
    static toDomain(raw: PrismaLoan): Loan {
        const mappedStatus = DomainLoanStatus[raw.status as keyof typeof DomainLoanStatus]

        return new Loan({
            responsibleName: raw.responsibleName,
            responsibleRegistration: raw.responsibleRegistration,
            itemId: raw.itemId,
            quantity: raw.quantity,
            deadline: raw.deadline,
            status: mappedStatus,
            createdAt: raw.createdAt,
            returnedAt: raw.returnedAt
        }, raw.id)
    }

    static toPrisma(loan: Loan): Prisma.LoanUncheckedCreateInput {
        const mappedStatus = PrismaLoanStatus[loan.status as keyof typeof PrismaLoanStatus]

        return {
            id: loan.id,
            responsibleName: loan.responsibleName,
            responsibleRegistration: loan.responsibleRegistration,
            itemId: loan.itemId,
            quantity: loan.quantity,
            deadline: loan.deadline,
            status: mappedStatus,
            createdAt: loan.createdAt,
            returnedAt: loan.returnedAt ?? null
        }
    }
}