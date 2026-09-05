import type { AirConditioner } from "../../entities/air-conditioner";
import type { AirConditionerFilters, AirConditionersRepository } from "../../repositories/air-conditioners-repository";

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
        const airConditioner = this.items.filter(item => {
            if(filter.roomId && item.roomId !== filter.roomId) {
                return false
            }
            if(filter.status && item.status !== filter.status) {
                return false
            }
            return true
        })

        return airConditioner
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