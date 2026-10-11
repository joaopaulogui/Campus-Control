import type { Item } from "../item"
import type { Loan } from "../loan"

export type LoanWithItem = {
    loan: Loan
    item: Item
}