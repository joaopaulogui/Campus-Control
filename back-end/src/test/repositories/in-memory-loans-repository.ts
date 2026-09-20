import type { Loan } from "../../entities/loan";
import type { LoanFilters, LoansRepository } from "../../repositories/loans-repository";

export class InMemoryLoansRepository implements LoansRepository {
    public items: Loan[] = []

    async create(loan: Loan): Promise<void> {
        this.items.push(loan)
    }

    async findMany(filters?: LoanFilters): Promise<Loan[]> {
        const loans = this.items.filter(item => {
            if(filters?.responsibleName && !item.responsibleName.includes(filters.responsibleName)){
                return false
            }
            if(filters?.itemIds && !filters.itemIds.includes(item.id)){
                return false
            }
            if(filters?.status && item.status !== filters.status){
                return false
            }
            return true
        })

        return loans
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