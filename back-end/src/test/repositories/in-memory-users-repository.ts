import type { User } from "../../entities/user";
import type { UsersRepository } from "../../repositories/users-repositoy";

export class InMemoryUsersRepository implements UsersRepository {
    public items: User[] = []
    
    async create(user: User): Promise<void> {
        this.items.push(user)
    }

    async findById(id: string): Promise<User | null> {
        const user = this.items.find(user => user.id === id)

        if(!user) {
            return null
        }

        return user
    }

    async findByEmail(email: string): Promise<User | null> {
        const user = this.items.find(user => user.email === email)

        if(!user) {
            return null
        }

        return user
    }

    async delete(user: User): Promise<void> {
        const itemIndex = this.items.findIndex(item => item.email === user.email)

        this.items.splice(itemIndex, 1)
    }
}