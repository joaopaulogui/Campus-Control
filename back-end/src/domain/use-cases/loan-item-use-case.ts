import { Loan, LoanStatus } from "../entities/loan";
import type { ItemsRepository } from "../repositories/items-repository";
import type { LoansRepository } from "../repositories/loans-repository";

interface LoanItemUseCaseRequest {
    responsibleName: string,
    responsibleRegistration: string,
    itemId: string,
    quantity: number,
    deadline: Date,
}

interface LoanItemUseCaseResponse {}

export class LoanItemUseCase {
    constructor(
        private itemsRepository: ItemsRepository,
        private loansRepository: LoansRepository,
    ) {}

    async execute({ 
        responsibleName, 
        responsibleRegistration,
        itemId,
        quantity,
        deadline,
    }: LoanItemUseCaseRequest): Promise<LoanItemUseCaseResponse> {
        const item = await this.itemsRepository.findById(itemId)

        if(!item) {
            throw new Error()
        }

        const loan = new Loan({
            responsibleName,
            responsibleRegistration,
            itemId,
            quantity,
            deadline,
            status: LoanStatus.IN_USE,
            createdAt: new Date()
        })

        item.loan(quantity)

        await this.loansRepository.create(loan)

        await this.itemsRepository.save(item)

        return {}
    }
}