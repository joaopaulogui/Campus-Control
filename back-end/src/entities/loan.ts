export enum LoanStatus {
    IN_USE,
    LATE,
    RETURNED
}

export interface LoanProps {
    id: string
    responsibleId: string
    itemId: string
    createdAt: Date
    returnDate: Date
    status: LoanStatus
}

export class Loan {
    private props: LoanProps

    constructor(props: LoanProps) {
        this.props = props
    }

    get id() {
        return this.props.id
    }

    get responsibleId() {
        return this.props.responsibleId
    }

    set responsibleId(responsibleId: string) {
        this.props.responsibleId = responsibleId
    }

    get itemId() {
        return this.props.itemId
    }

    set itemId(itemId: string) {
        this.props.itemId = itemId
    }

    get createdAt() {
        return this.props.createdAt
    }

    get returnDate() {
        return this.props.returnDate
    }

    set returnDate(returnDate: Date) {
        this.props.returnDate = returnDate
    }

    get status() {
        return this.props.status
    }

    set status(status: LoanStatus) {
        this.props.status = status
    }
}