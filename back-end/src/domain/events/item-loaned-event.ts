import type { DomainEvent } from "@/core/events/domain-event";
import type { Loan } from "../entities/loan";

export class ItemLoanedEvent implements DomainEvent {
    occuredAt: Date
    loan: Loan
    userId: string
    
    constructor(loan: Loan, userId: string) {
        this.loan = loan
        this.userId = userId
        this.occuredAt = new Date()
    }

    getAggregateId(): String {
        return this.loan.id
    }
}