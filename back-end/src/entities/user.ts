import { randomUUID } from "node:crypto"

export enum UserRole {
    ADMIN = "ADMIN",
    MEMBER = "MEMBER",
}

export interface UserProps {
    name: string  
    email: string
    password: string
    role: UserRole
    createdAt: Date
    updatedAt?: Date | null
}

export class User {
    private _id: string
    private props: UserProps

    constructor(props: UserProps, id?: string) {
        this._id = id ?? randomUUID()
        this.props = props
    }

    get id() {
        return this._id
    }

    get name() {
        return this.props.name
    }

    set name(name: string) {
        this.props.name = name
        this.touch()
    }

    get email() {
        return this.props.email
    }

    set email(email: string) {
        this.props.email = email
        this.touch()
    }

    get password() {
        return this.props.password
    }

    set password(password: string) {
        this.props.password = password
        this.touch()
    }

    get role() {
        return this.props.role
    }

    set role(role: UserRole) {
        this.props.role = role
        this.touch()
    }

    private touch() {
        this.props.updatedAt = new Date()
    }
}