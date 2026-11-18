import type { Loan } from "@domain/entities/loan";
import type { LoanWithItem } from "@domain/entities/value-objects/loan-with-item";

export class LoanPresenter {
    static toHTTP(loan: Loan) {
        return {
            id: loan.id,
            itemId: loan.itemId,
            responsibleName: loan.responsibleName,
            responsibleRegistration: loan.responsibleRegistration,
            quantity: loan.quantity,
            createdAt: loan.createdAt,
            returnedAt: loan.returnedAt,
            deadline: loan.deadline,
            status: loan.status
        }
    }

    static toHTTPWithItem(loanWithItem: LoanWithItem) {
        return {
            id: loanWithItem.id,
            responsibleName: loanWithItem.responsibleName,
            responsibleRegistration: loanWithItem.responsibleRegistration,
            itemId: loanWithItem.id,
            itemName: loanWithItem.itemName,
            quantity: loanWithItem.quantity,
            createdAt: loanWithItem.createdAt,
            returnedAt: loanWithItem.returnedAt,
            deadline: loanWithItem.deadline,
            status: loanWithItem.status
        }
    }
}