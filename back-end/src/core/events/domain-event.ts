export interface DomainEvent {
    occuredAt: Date
    getAggregateId(): String
}