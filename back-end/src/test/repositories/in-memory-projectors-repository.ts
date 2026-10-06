import type { Projector } from "../../entities/projector";
import type { ProjectorFilters, ProjectorsRepository } from "../../repositories/projectors-repository";

export class InMemoryProjectorsRepository implements ProjectorsRepository {
    public items: Projector[] = []

    async create(projector: Projector): Promise<void> {
        this.items.push(projector)
    }

    async findById(id: string): Promise<Projector | null> {
        const projector = this.items.find(item => item.id === id)

        if(!projector) {
            return null
        }

        return projector
    }

    async findMany(filters: ProjectorFilters): Promise<Projector[]> {
        const projectors = this.items.filter(item => {
            if(filters.roomIds && !filters.roomIds.includes(item.roomId)) {
                return false
            }
            if(filters.status && filters.status !== item.status) {
                return false
            }
            return true
        })

        return projectors
    }

    async save(projector: Projector): Promise<void> {
        const itemIndex = this.items.findIndex(item => item.id === projector.id)

        this.items[itemIndex] = projector
    }

    async delete(projector: Projector): Promise<void> {
        const itemIndex = this.items.findIndex(item => item.id === projector.id)

        this.items.splice(itemIndex, 1)
    }
}