import type { PaginationParams } from "@/core/repositories/pagination-params";
import type { AirConditionerWithRoom } from "@/domain/entities/value-objects/air-conditioner-with-room";
import type { AirConditioner } from "@domain/entities/air-conditioner";
import type { AirConditionerFilters, AirConditionersRepository } from "@domain/repositories/air-conditioners-repository";

export class InMemoryAirConditionersRepository implements AirConditionersRepository {
    public items: AirConditioner[] = []
    
    async create(airConditioner: AirConditioner): Promise<void> {
        this.items.push(airConditioner)
    }

    async findById(id: string): Promise<AirConditioner | null> {
        const airConditioner = this.items.find(item => item.id === id)

        if(!airConditioner) {
            return null
        }

        return airConditioner
    }

    async findMany(filter: AirConditionerFilters): Promise<AirConditioner[]> {
        const airConditioners = this.items.filter(item => {
            if(filter.roomIds && !filter.roomIds.includes(item.roomId)) {
                return false
            }
            if(filter.status && item.status !== filter.status) {
                return false
            }
            return true
        })

        return airConditioners
    }

    async findManyPaginated(filter?: AirConditionerFilters, params: PaginationParams = { page: 1, perPage: 30 }): Promise<AirConditioner[]> {
        const airConditioners = this.items.filter(item => {
            if(filter?.roomIds && !filter.roomIds.includes(item.roomId)) {
                return false
            }
            if(filter?.status && item.status !== filter.status) {
                return false
            }
            return true
        }).slice((params.page-1) * params.perPage, params.page * params.perPage)

        return airConditioners
    }

    async findManyWithRoom(filter: AirConditionerFilters): Promise<AirConditionerWithRoom[]> {
        const airConditioners = this.items.filter(item => {
            if(filter.roomIds && !filter.roomIds.includes(item.roomId)) {
                return false
            }
            if(filter.status && item.status !== filter.status) {
                return false
            }
            return true
        })


        return airConditioners.map(airConditioner => ({
            id: airConditioner.id,
            status: airConditioner.status,
            isOn: airConditioner.isOn,
            temperature: airConditioner.temperature,
            roomId: airConditioner.roomId,
            roomName: "",
            updatedAt: airConditioner.updatedAt ?? null
        }))
    }

    async findManyWithRoomPaginated(filter?: AirConditionerFilters, params: PaginationParams = { page: 1, perPage: 30 }): Promise<AirConditionerWithRoom[]> {
        const airConditioners = this.items.filter(item => {
            if(filter?.roomIds && !filter.roomIds.includes(item.roomId)) {
                return false
            }
            if(filter?.status && item.status !== filter.status) {
                return false
            }
            return true
        }).slice((params.page-1) * params.perPage, params.page * params.perPage)

        return airConditioners.map(airConditioner => ({
            id: airConditioner.id,
            status: airConditioner.status,
            isOn: airConditioner.isOn,
            temperature: airConditioner.temperature,
            roomId: airConditioner.roomId,
            roomName: "",
            updatedAt: airConditioner.updatedAt ?? null
        }))
    }

    async save(airConditioner: AirConditioner): Promise<void> {
        const itemIndex = this.items.findIndex(item => item.id === airConditioner.id)

        this.items[itemIndex] = airConditioner
    }

    async delete(airConditioner: AirConditioner): Promise<void> {
        const itemIndex = this.items.findIndex(item => item.id === airConditioner.id)

        this.items.splice(itemIndex, 1)
    }
}