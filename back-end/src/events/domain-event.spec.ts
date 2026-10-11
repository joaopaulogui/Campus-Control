import { describe, expect, test, vi } from "vitest";
import { AggregateRoot } from "../entities/aggregate-root";
import type { DomainEvent } from "./domain-event";
import { DomainEvents } from "./domain-events";

class FakeAggregate extends AggregateRoot<null> {
    constructor() {
        super(null)

        this.addDomainEvent(new FakeAggregateCreated(this))
    }
}

class FakeAggregateCreated implements DomainEvent {
    public occuredAt: Date
    private aggregate: FakeAggregate

    constructor(aggregate: FakeAggregate) {
        this.aggregate = aggregate
        this.occuredAt = new Date()
    }

    public getAggregateId(): String {
        return this.aggregate.id
    }
}

describe("Domain events", () => {
    test("It should be able to dispatch and listen to events", () => {
        const callbackSpy = vi.fn()

        DomainEvents.register(callbackSpy, FakeAggregateCreated.name)

        const aggregate = new FakeAggregate()

        expect(aggregate.domainEvents).toHaveLength(1)

        DomainEvents.dispatchEventsForAggregate(aggregate.id)

        expect(callbackSpy).toHaveBeenCalled()
        expect(aggregate.domainEvents).toHaveLength(0)
    })
})