import { faker } from "@faker-js/faker";
import { Audit, EntityType, type AuditProps } from "@domain/entities/audit";
import { randomUUID } from "node:crypto";

export function makeAudit(override: Partial<AuditProps> = {}, id?: string): Audit {
    const audit = new Audit({
        userId: randomUUID(),
        eventType: faker.lorem.word(),
        eventEntity: faker.helpers.enumValue(EntityType),
        entityId: randomUUID(),
        description: faker.lorem.sentence(),
        createdAt: new Date(),
        metadata: {},
        ...override,
    }, id)

    return audit
}