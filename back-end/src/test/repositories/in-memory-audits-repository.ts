import type { Audit } from "@domain/entities/audit";
import type { AuditFilters, AuditsRepository } from "@domain/repositories/audits-repository";

export class InMemoryAuditsRepository implements AuditsRepository {
    public items: Audit[] = []
    
    async create(audit: Audit): Promise<void> {
        this.items.push(audit)
    }

    async findMany(filters?: AuditFilters): Promise<Audit[]> {
        const audits = this.items.filter((item) => {
            if(filters?.userId && item.userId !== filters.userId) {
                return false
            }
            if(filters?.eventType && item.eventType !== filters.eventType) {
                return false
            }
            if(filters?.eventEntity && item.eventEntity !== filters.eventEntity) {
                return false
            }
            if(filters?.entityId && item.entityId !== filters.entityId) {
                return false
            }
            if(filters?.description && !item.description.includes(filters.description)) {
                return false
            }
            return true
        })

        return audits
    }
}