import type z from "zod";
import type { eventEntityTypeSchema, getAuditsQueryParamsSchema } from "@/schemas/audit.schema";

export type EventEntity = z.infer<typeof eventEntityTypeSchema>

export type Audit = {
    userId: string
    eventType: string
    eventEntity: EventEntity
    entityId: string
    description: string
    createdAt: string
    metadata: string
}

export type GetAuditsQueryParamsSchema = z.infer<typeof getAuditsQueryParamsSchema>