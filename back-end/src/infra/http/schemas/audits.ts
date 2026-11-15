import { EntityType } from "@/domain/entities/audit";
import { z } from "zod";

export const listAuditsQuerySchema = z.object({
    userId: z.uuid().optional(),
    eventType: z.string().optional(),
    eventEntity: z.enum(EntityType).optional(),
    entityId: z.uuid().optional(),
    description: z.string().optional(),
    page: z.coerce.number().int().positive().optional(),
    perPage: z.coerce.number().int().nonnegative().optional()
})

export const listRecentActivitiesQuerySchema = z.object({
    page: z.coerce.number().int().positive().optional(),
    perPage: z.coerce.number().int().nonnegative().optional()
})

export const auditResponseSchema = z.object({
    userId: z.uuid().optional(),
    eventType: z.string(),
    eventEntity: z.enum(EntityType),
    entityId: z.string(),
    description: z.string(),
    createdAt: z.iso.datetime(),
    metadata: z.json()
})

export const listAuditsResponseSchema = z.array(auditResponseSchema)