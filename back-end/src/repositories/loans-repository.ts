import { Loan, LoanStatus } from "../entities/loan.js";

export interface LoanFilters {
    responsibleName?: string | undefined,
    itemIds?: string[] | undefined,
    status?: LoanStatus | undefined,
}

export interface LoansRepository {
    create(loan: Loan): Promise<void>
    findById(id: string): Promise<Loan | null>
    findMany(filters?: LoanFilters): Promise<Loan[]>
    save(loan: Loan): Promise<void>
    delete(loan: Loan): Promise<void>
}