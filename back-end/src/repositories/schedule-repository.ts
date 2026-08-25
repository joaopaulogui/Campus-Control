import { Schedule } from "../entities/schedule";

export enum WeekFilter {
    THIS_WEEK,
    NEXT_WEEK
}

export interface SchedulesRepository {
    create(schedule: Schedule): Promise<void>
    findByRoomIdAndWeek(roomId: string, week: WeekFilter): Promise<Schedule>
    save(schedule: Schedule): Promise<void>
    delete(schedule: Schedule): Promise<void>
}