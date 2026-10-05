import type { Loan } from "../../entities/loan";
import type { LoanWithItem } from "../../repositories/loans-repository";

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
            id: loanWithItem.loan.id,
            itemName: loanWithItem.item.name,
            itemId: loanWithItem.item.id,
            responsibleName: loanWithItem.loan.responsibleName,
            responsibleRegistration: loanWithItem.loan.responsibleRegistration,
            quantity: loanWithItem.loan.quantity,
            createdAt: loanWithItem.loan.createdAt,
            returnedAt: loanWithItem.loan.returnedAt,
            deadline: loanWithItem.loan.deadline,
            status: loanWithItem.loan.status
        }
    }
}