import type { PaginationParams } from "@/core/repositories/pagination-params";
import type { ProjectorWithRoom } from "@/domain/entities/value-objects/projector-with-room";
import type { Projector } from "@domain/entities/projector";
import type { ProjectorFilters, ProjectorsRepository } from "@domain/repositories/projectors-repository";

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

    async findManyPaginated(filters?: ProjectorFilters, params: PaginationParams = { page: 1, perPage: 30 }): Promise<Projector[]> {
        const projectors = this.items.filter(item => {
            if(filters?.roomIds && !filters.roomIds.includes(item.roomId)) {
                return false
            }
            if(filters?.status && filters.status !== item.status) {
                return false
            }
            return true
        }).slice((params.page-1) * params.perPage, params.page * params.perPage)

        return projectors
    }

    async findManyWithRoom(filters: ProjectorFilters): Promise<ProjectorWithRoom[]> {
        const projectors = this.items.filter(item => {
            if(filters.roomIds && !filters.roomIds.includes(item.roomId)) {
                return false
            }
            if(filters.status && filters.status !== item.status) {
                return false
            }
            return true
        })

        return projectors.map(projector => ({
            id: projector.id,
            status: projector.status,
            roomId: projector.roomId,
            roomName: "",
            updatedAt: projector.updatedAt ?? null
        }))
    }

    async findManyWithRoomPaginated(filters?: ProjectorFilters, params: PaginationParams = { page: 1, perPage: 30 }): Promise<ProjectorWithRoom[]> {
        const projectors = this.items.filter(item => {
            if(filters?.roomIds && !filters.roomIds.includes(item.roomId)) {
                return false
            }
            if(filters?.status && filters.status !== item.status) {
                return false
            }
            return true
        }).slice((params.page-1) * params.perPage, params.page * params.perPage)

        return projectors.map(projector => ({
            id: projector.id,
            status: projector.status,
            roomId: projector.roomId,
            roomName: "",
            updatedAt: projector.updatedAt ?? null
        }))
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