import { Item } from "../entities/item.js";
import { Loan } from "../entities/loan.js";

export interface LoansRepository {
    create(loan: Loan): Promise<void>
    findManyByResponsibleName(ResponsibleName: string): Promise<Item[]>
    findManyByItemName(itemName: string): Promise<Item[]>
    save(loan: Loan): Promise<void>
    delete(loan: Loan): Promise<void>
}