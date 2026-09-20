import type { Loan } from "../../entities/loan";
import type { LoanWhereInput } from "../../generated/prisma/models";
import { prisma } from "../../lib/prisma";
import { PrismaLoanMapper } from "../../mappers/prisma-loan-mapper";
import type { LoanFilters, LoansRepository } from "../loans-repository";

export class PrismaLoansRepository implements LoansRepository {
    async create(loan: Loan): Promise<void> {
        const data = PrismaLoanMapper.toPrisma(loan)

        await prisma.loan.create({ data, })
    }

    async findMany(filters?: LoanFilters): Promise<Loan[]> {
        const where: LoanWhereInput = {}

        if(filters?.responsibleName) {
            where.responsibleName = { contains: filters.responsibleName }
        }

        if(filters?.itemIds) {
            where.itemId = { in: filters.itemIds }
        }

        if(filters?.status) {
            where.status = filters.status
        }

        const loans = await prisma.loan.findMany({ where, })

        return loans.map(PrismaLoanMapper.toDomain)
    }

    async save(loan: Loan): Promise<void> {
        const data = PrismaLoanMapper.toPrisma(loan)

        await prisma.loan.update({
            where: { id: loan.id },
            data,
        })
    }

    async delete(loan: Loan): Promise<void> {
        await prisma.loan.delete({
            where: { id: loan.id }
        })
    }
}