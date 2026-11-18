import type { PaginationParams } from "@/core/repositories/pagination-params.js";
import { Loan, LoanStatus } from "../entities/loan.js";
import type { LoanWithItem } from "../entities/value-objects/loan-with-item.js";

export interface LoanFilters {
    responsibleName?: string | undefined,
    itemIds?: string[] | undefined,
    itemName?: string | undefined,
    status?: LoanStatus | undefined,
}

export interface LoansRepository {
    create(loan: Loan): Promise<void>
    findById(id: string): Promise<Loan | null>
    findMany(filters?: LoanFilters): Promise<Loan[]>
    findManyPaginated(filters?: LoanFilters, params?: PaginationParams): Promise<Loan[]>
    findManyWithItem(filters?: LoanFilters): Promise<LoanWithItem[]>
    findManyWithItemPaginated(filters?: LoanFilters, params?: PaginationParams): Promise<LoanWithItem[]>
    save(loan: Loan): Promise<void>
    delete(loan: Loan): Promise<void>
}