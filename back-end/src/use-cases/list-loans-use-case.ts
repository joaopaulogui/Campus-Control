import type { Item } from "../entities/item"
import type { Loan, LoanStatus } from "../entities/loan"
import type { ItemsRepository } from "../repositories/items-repository"
import type { LoansRepository, LoanWithItem } from "../repositories/loans-repository"

interface ListLoansUseCaseRequest {
    responsibleName?: string | undefined
    itemName?: string | undefined
    status?: LoanStatus | undefined
}

interface ListLoansUseCaseResponse {
    loans: LoanWithItem[]
}

export class ListLoansUseCase {
    constructor(
        private itemsRepository: ItemsRepository,
        private loansRepository: LoansRepository,
    ) {}

    async execute({ responsibleName, itemName, status }: ListLoansUseCaseRequest): Promise<ListLoansUseCaseResponse> {

        const items = await this.itemsRepository.findMany({ name: itemName, })

        const itemIds = items.map(item => item.id)

        const loans = await this.loansRepository.findMany({ itemIds, status, responsibleName })
        
        const loansWithItems = loans.map(loan => ({
            loan,
            item: items.find(item => loan.itemId === item.id)!
        }))
        
        return {
            loans: loansWithItems,
        }
    }
}