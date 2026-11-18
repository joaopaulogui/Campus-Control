import type { LoanStatus } from "../entities/loan"
import type { LoanWithItem } from "../entities/value-objects/loan-with-item"
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
        private loansRepository: LoansRepository,
    ) {}

    async execute({ responsibleName, itemName, status, page = 1, perPage = 30 }: ListLoansUseCaseRequest): Promise<ListLoansUseCaseResponse> {
        const loans = await this.loansRepository.findManyWithItemPaginated({ itemName, status, responsibleName }, { page, perPage })
        
        return {
            loans,
        }
    }
}