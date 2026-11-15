import type { LoanStatus } from "../entities/loan"
import type { LoanWithItem } from "../entities/value-objects/loan-with-item"
import type { ItemsRepository } from "../repositories/items-repository"
import type { LoansRepository } from "../repositories/loans-repository"

interface ListLoansUseCaseRequest {
    responsibleName?: string | undefined
    itemName?: string | undefined
    status?: LoanStatus | undefined
    page?: number | undefined
    perPage?: number | undefined
}

interface ListLoansUseCaseResponse {
    loans: LoanWithItem[]
}

export class ListLoansUseCase {
    constructor(
        private itemsRepository: ItemsRepository,
        private loansRepository: LoansRepository,
    ) {}

    async execute({ responsibleName, itemName, status, page, perPage }: ListLoansUseCaseRequest): Promise<ListLoansUseCaseResponse> {
        if(!page) { page = 1 }

        if(!perPage) { perPage = 30 }

        const items = await this.itemsRepository.findMany({ name: itemName, })

        const itemIds = items.map(item => item.id)

        const loans = await this.loansRepository.findManyPaginated({ itemIds, status, responsibleName }, { page, perPage })
        
        const loansWithItems = loans.map(loan => ({
            loan,
            item: items.find(item => loan.itemId === item.id)!
        }))
        
        return {
            loans: loansWithItems,
        }
    }
}