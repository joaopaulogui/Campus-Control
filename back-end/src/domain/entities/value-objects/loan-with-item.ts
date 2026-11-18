import type { LoanProps } from "../loan"

export type LoanWithItem = Readonly<LoanProps & {
    id: string,
    itemName: string,
}>