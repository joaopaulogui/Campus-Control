import type { Building } from "@/domain/entities/building";
import type { User } from "@domain/entities/user";

export class UserPresenter {
    static toHttp(user: User) {
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        }  
    }

    static toHttpWithBuildings(user: User, buildings: Building[]) {
        return {
            ...this.toHttp(user),
            buildings: buildings.map((building) => ({
                id: building.id,
                name: building.name
            }))
        }
    }
}