import type { Loan } from "@domain/entities/loan";
import type { LoanWhereInput } from "@generated/prisma/models";
import { prisma } from "../lib/prisma";
import { PrismaLoanMapper } from "../mappers/prisma-loan-mapper";
import type { LoanFilters, LoansRepository } from "@domain/repositories/loans-repository";
import { DomainEvents } from "@/core/events/domain-events";
import type { PaginationParams } from "@/core/repositories/pagination-params";
import type { LoanWithItem } from "@/domain/entities/value-objects/loan-with-item";
import { loanWithItemInclude } from "../queries/loan-wth-item-query";
import { PrismaLoanWithItemMapper } from "../mappers/read-models/prisma-loan-with-item-mapper";

export class PrismaLoansRepository implements LoansRepository {
    async create(loan: Loan): Promise<void> {
        const data = PrismaLoanMapper.toPrisma(loan)

        await prisma.loan.create({ data, })

        DomainEvents.dispatchEventsForAggregate(loan.id)
    }

    async findById(id: string): Promise<Loan | null> {
        const loan = await prisma.loan.findUnique({ where: { id, } })

        if(!loan) {
            return null
        }

        return PrismaLoanMapper.toDomain(loan)
    }

    async findMany(filters?: LoanFilters): Promise<Loan[]> {
        const where = this.buildWhere(filters)

        const loans = await prisma.loan.findMany({ 
            where, 
            orderBy: {
                createdAt: "asc"
            },
        })

        return loans.map(PrismaLoanMapper.toDomain)
    }

    async findManyPaginated(filters?: LoanFilters, params: PaginationParams = { page: 1, perPage: 30 }): Promise<Loan[]> {
        const where = this.buildWhere(filters)

        const loans = await prisma.loan.findMany({ 
            where, 
            orderBy: {
                createdAt: "asc"
            },
            take: params.perPage,
            skip: (params.page - 1) * params.perPage
        })

        return loans.map(PrismaLoanMapper.toDomain)
    }

    async findManyWithItem(filters?: LoanFilters): Promise<LoanWithItem[]> {
        const where = this.buildWhere(filters)

        const loans = await prisma.loan.findMany({ 
            where, 
            include: loanWithItemInclude,
            orderBy: {
                createdAt: "asc"
            },
        })

        return loans.map(PrismaLoanWithItemMapper.toLoanWithItem)
    }

    async findManyWithItemPaginated(filters?: LoanFilters, params: PaginationParams = { page: 1, perPage: 30 }): Promise<LoanWithItem[]> {
        const where = this.buildWhere(filters)

        const loans = await prisma.loan.findMany({ 
            where, 
            include: loanWithItemInclude,
            orderBy: {
                createdAt: "asc"
            },
            take: params.perPage,
            skip: (params.page - 1) * params.perPage
        })

        return loans.map(PrismaLoanWithItemMapper.toLoanWithItem)
    }

    async save(loan: Loan): Promise<void> {
        const data = PrismaLoanMapper.toPrisma(loan)

        await prisma.loan.update({
            where: { id: loan.id },
            data,
        })

        DomainEvents.dispatchEventsForAggregate(loan.id)
    }

    async delete(loan: Loan): Promise<void> {
        await prisma.loan.delete({
            where: { id: loan.id }
        })

        DomainEvents.dispatchEventsForAggregate(loan.id)
    }

    private buildWhere(filters?: LoanFilters): LoanWhereInput {
        const where: LoanWhereInput = {}

        if(filters?.responsibleName) {
            where.responsibleName = {
                contains: filters.responsibleName,
                mode: "insensitive"
            }
        }

        if(filters?.itemIds) {
            where.itemId = { in: filters.itemIds }
        }

        if(filters?.itemName) {
            where.item = {
                name: {
                    contains: filters.itemName,
                    mode: "insensitive"
                }
            }
        }

        if(filters?.status) {
            where.status = filters.status
        }

        return where
    }
}