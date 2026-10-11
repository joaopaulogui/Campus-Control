import type { AggregateRoot } from "../entities/aggregate-root"
import type { DomainEvent } from "./domain-event"

type DomainEventCallback = (event: unknown) => void

export class DomainEvents {
    private static handlersMap: Record<string, DomainEventCallback[]> = {}
    private static markedAggregates: AggregateRoot<unknown>[] = []

    public static register(callback: DomainEventCallback, eventClassName: string) {
        const wasEventRegisteredBefore = eventClassName in this.handlersMap

        if(!wasEventRegisteredBefore) {
            this.handlersMap[eventClassName] = []
        }

        this.handlersMap[eventClassName].push(callback)
    }

    private static findMarkedAggregateById(id: string): AggregateRoot<unknown> | undefined {
        return this.markedAggregates.find((aggregate) => aggregate.id === id)
    }

    public static markAggregateForDispatch(aggregate: AggregateRoot<unknown>) {
        const aggregateFound = !!this.findMarkedAggregateById(aggregate.id)

        if(!aggregateFound) {
            this.markedAggregates.push(aggregate)
        }
    }

    private static dispatch(event: DomainEvent) {
        const eventClassName: string = event.constructor.name

        const isEventRegistered = eventClassName in this.handlersMap

        if(isEventRegistered) {
            const handlers = this.handlersMap[eventClassName]

            for(const handler of handlers) {
                handler(event)
            }
        }
    }

    private static dispatchAggregateEvents(aggregate: AggregateRoot<unknown>) {
        aggregate.domainEvents.forEach((event: DomainEvent) => this.dispatch(event))
    }

    private static removeAggregateFromMarkedDispatchList(aggregate: AggregateRoot<unknown>) {
        const index = this.markedAggregates.findIndex((a) => a.id === aggregate.id)

        this.markedAggregates.splice(index, 1)
    }

    public static dispatchEventsForAggregate(id: string) {
        const aggregate = this.findMarkedAggregateById(id)

        if(aggregate) {
            this.dispatchAggregateEvents(aggregate)
            aggregate.clearEvents()
            this.removeAggregateFromMarkedDispatchList(aggregate)
        }
    }

    public static clearHandlers() {
        this.handlersMap = {}
    }

    public static clearMarkedAggregates() {
        this.markedAggregates = []
    }
}