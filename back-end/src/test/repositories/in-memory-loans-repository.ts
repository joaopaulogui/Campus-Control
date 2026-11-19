import type { PaginationParams } from "@/core/repositories/pagination-params";
import type { LoanWithItem } from "@/domain/entities/value-objects/loan-with-item";
import type { Loan } from "@domain/entities/loan";
import type { LoanFilters, LoansRepository } from "@domain/repositories/loans-repository";

export class InMemoryLoansRepository implements LoansRepository {
    public items: Loan[] = []

    async create(loan: Loan): Promise<void> {
        this.items.push(loan)
    }

    async findById(id: string): Promise<Loan | null> {
        const loan = this.items.find(item => item.id === id)

        if(!loan) {
            return null
        }

        return loan
    }

    async findMany(filters?: LoanFilters): Promise<Loan[]> {
        const loans = this.items.filter(item => {
            if(filters?.responsibleName && !item.responsibleName.includes(filters.responsibleName)){
                return false
            }
            if(filters?.itemIds && !filters.itemIds.includes(item.itemId)){
                return false
            }
            if(filters?.status && item.status !== filters.status){
                return false
            }
            return true
        })

        return loans
    }

    async findManyPaginated(filters?: LoanFilters, params: PaginationParams = { page: 1, perPage: 30 }): Promise<Loan[]> {
        const loans = this.items.filter(item => {
            if(filters?.responsibleName && !item.responsibleName.includes(filters.responsibleName)){
                return false
            }
            if(filters?.itemIds && !filters.itemIds.includes(item.itemId)){
                return false
            }
            if(filters?.status && item.status !== filters.status){
                return false
            }
            return true
        }).splice((params.page - 1) * params.perPage, params.page * params.perPage)

        return loans
    }

    async findManyWithItem(filters?: LoanFilters): Promise<LoanWithItem[]> {
        const loans = this.items.filter(item => {
            if(filters?.responsibleName && !item.responsibleName.includes(filters.responsibleName)){
                return false
            }
            if(filters?.itemIds && !filters.itemIds.includes(item.itemId)){
                return false
            }
            if(filters?.status && item.status !== filters.status){
                return false
            }
            return true
        })

        return loans.map(loan => ({
            id: loan.id,
            responsibleName: loan.responsibleName,
            responsibleRegistration: loan.responsibleRegistration,
            itemId: loan.itemId,
            itemName: "",
            quantity: loan.quantity,
            createdAt: loan.createdAt,
            status: loan.status,
            deadline: loan.deadline,
            returnedAt: loan.returnedAt ?? null
        }))
    }

    async findManyWithItemPaginated(filters?: LoanFilters, params: PaginationParams = { page: 1, perPage: 30 }): Promise<LoanWithItem[]> {
        const loans = this.items.filter(item => {
            if(filters?.responsibleName && !item.responsibleName.includes(filters.responsibleName)){
                return false
            }
            if(filters?.itemIds && !filters.itemIds.includes(item.itemId)){
                return false
            }
            if(filters?.status && item.status !== filters.status){
                return false
            }
            return true
        }).splice((params.page - 1) * params.perPage, params.page * params.perPage)

        return loans.map(loan => ({
            id: loan.id,
            responsibleName: loan.responsibleName,
            responsibleRegistration: loan.responsibleRegistration,
            itemId: loan.itemId,
            itemName: "",
            quantity: loan.quantity,
            createdAt: loan.createdAt,
            status: loan.status,
            deadline: loan.deadline,
            returnedAt: loan.returnedAt ?? null
        }))
    }

    async save(loan: Loan): Promise<void> {
        const itemIndex = this.items.findIndex(item => item.id === loan.id)
        
        this.items[itemIndex] = loan
    }
    
    async delete(loan: Loan): Promise<void> {
        const itemIndex = this.items.findIndex(item => item.id === loan.id)
        
        this.items.splice(itemIndex, 1)
    }
}