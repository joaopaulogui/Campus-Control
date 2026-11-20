import type { User } from "@domain/entities/user";
import type { UserFilters, UsersRepository } from "@domain/repositories/users-repositoy";

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

    async findMany(filters?: UserFilters): Promise<User[]> {
        const user = this.items.filter(user => {
            if(filters?.name && !user.name.includes(filters.name)) {
                return false
            }
            if(filters?.email && !user.email.includes(filters.email)) {
                return false
            }
            if(filters?.role && user.role !== filters.role) {
                return false
            }
            return true
        })

        return user
    }

    async findByEmail(email: string): Promise<User | null> {
        const user = this.items.find(user => user.email === email)

        if(!user) {
            return null
        }

        return user
    }

    async save(user: User): Promise<void> {
        const itemIndex = this.items.findIndex(item => item.id === user.id)

        this.items[itemIndex] = user
    }

    async delete(user: User): Promise<void> {
        const itemIndex = this.items.findIndex(item => item.id === user.id)

        this.items.splice(itemIndex, 1)
    }
}