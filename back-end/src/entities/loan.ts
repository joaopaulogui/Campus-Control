import { randomUUID } from "node:crypto"

export enum LoanStatus {
    IN_USE,
    LATE,
    RETURNED
}

export interface LoanProps {
    responsibleName: string
    responsibleRegistration: string
    itemId: string
    createdAt: Date
    returnDate: Date
    status: LoanStatus
}

export class Loan {
    private _id: string
    private props: LoanProps

    constructor(props: LoanProps, id?: string) {
        this._id = id ?? randomUUID()
        this.props = props
    }

    get id() {
        return this._id
    }

    get responsibleName() {
        return this.props.responsibleName
    }

    set responsibleName(responsibleName: string) {
        this.props.responsibleName = responsibleName
    }

    get responsibleRegistration() {
        return this.props.responsibleName
    }

    set responsibleRegistration(responsibleRegistration: string) {
        this.props.responsibleRegistration = responsibleRegistration
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