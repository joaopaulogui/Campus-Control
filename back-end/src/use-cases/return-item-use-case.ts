import type { ItemsRepository } from "../repositories/items-repository";
import type { LoansRepository } from "../repositories/loans-repository";

interface ReturnItemUseCaseRequest {
    loanId: string
}

interface ReturnItemUseCaseResponse {}

export class ReturnItemUseCase {
    constructor(
        private loansRepository: LoansRepository,
        private itemsRepository: ItemsRepository,
    ) {}

    async execute({ loanId }: ReturnItemUseCaseRequest): Promise<ReturnItemUseCaseResponse> {
        const loan = await this.loansRepository.findById(loanId)
    
        if(!loan) {
            throw new Error()
        }
        
        const item = await this.itemsRepository.findById(loan.itemId)
    
        if(!item) {
            throw new Error()
        }
        
        item.return(loan.quantity)

        loan.markAsReturned()

        this.itemsRepository.save(item)
        this.loansRepository.save(loan)

        return {}
    }
}