import { randomUUID } from "node:crypto"

export enum LoanStatus {
    IN_USE = "IN_USE",
    LATE = "LATE",
    RETURNED = "RETURNED",
}

export interface LoanProps {
    responsibleName: string
    responsibleRegistration: string
    itemId: string
    quantity: number
    createdAt: Date
    returnedAt?: Date | null
    deadline: Date
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

    get responsibleRegistration() {
        return this.props.responsibleName
    }

    get itemId() {
        return this.props.itemId
    }

    get quantity() {
        return this.props.quantity
    }

    get createdAt() {
        return this.props.createdAt
    }

    get returnedAt() {
        return this.props.returnedAt
    }

    get deadline() {
        return this.props.deadline
    }

    get status() {
        return this.props.status
    }

    set status(status: LoanStatus) {
        this.props.status = status
    }

    markAsReturned(returnedAt: Date = new Date()) {
        if(this.props.status === LoanStatus.RETURNED) {
            throw new Error(`Loan ${this._id} was already returned`)
        }

        this.props.returnedAt = returnedAt
        this.props.status = LoanStatus.RETURNED
    }
}