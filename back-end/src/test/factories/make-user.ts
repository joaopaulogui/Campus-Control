import { faker } from "@faker-js/faker";
import { User, UserRole, type UserProps } from "../../entities/user";

export function makeUser(overload: Partial<UserProps> = {}, id?: string): User {
    const user = new User({
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        role: faker.helpers.enumValue(UserRole),
        createdAt: new Date(),
        ...overload,
    }, id)

    return user
}