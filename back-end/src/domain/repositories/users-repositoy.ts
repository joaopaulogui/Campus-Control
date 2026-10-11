import { User } from "../entities/user.js";

export interface UsersRepository {
    create(user: User): Promise<void>
    findById(id: string): Promise<User | null>
    findByEmail(email: string): Promise<User | null>
    delete(user: User): Promise<void>
}