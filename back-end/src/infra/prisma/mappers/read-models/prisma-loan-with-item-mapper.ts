import type { LoanWithItem } from "@/domain/entities/value-objects/loan-with-item";
import type { PrismaLoanWithItem } from "../../queries/loan-wth-item-query";
import { LoanStatus as DomainLoanStatus } from "@/domain/entities/loan";

export class PrismaLoanWithItemMapper {
    static toLoanWithItem(raw: PrismaLoanWithItem): LoanWithItem {
        const mappedStatus = DomainLoanStatus[raw.status as keyof typeof DomainLoanStatus]

        return {
            id: raw.id,
            responsibleName: raw.responsibleName,
            responsibleRegistration: raw.responsibleRegistration,
            itemId: raw.itemId,
            itemName: raw.item.name,
            quantity: raw.quantity,
            deadline: raw.deadline,
            status: mappedStatus,
            createdAt: raw.createdAt,
            returnedAt: raw.returnedAt
        }
    }
}