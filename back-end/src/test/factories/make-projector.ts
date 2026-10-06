import { randomUUID } from "node:crypto";
import { Projector, ProjectorStatus, type ProjectorProps } from "../../entities/projector";
import { faker } from "@faker-js/faker";

export function makeProjector(override: Partial<ProjectorProps> = {}, id?: string) {
    return new Projector({
        roomId: randomUUID(),
        status: faker.helpers.enumValue(ProjectorStatus),
        ...override
    }, id)
}