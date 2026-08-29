function hasConflict(scheduleList, room, day, startHour, endHour) {
  return scheduleList.some(
    (item) =>
      item.room === room &&
      item.day === day &&
      Number(startHour) < Number(item.endHour) &&
      Number(endHour) > Number(item.startHour),
  );
}

function addReservation(
  schedules,
  currentWeek,
  room,
  floor,
  day,
  startHour,
  endHour,
  title,
) {
  schedules[currentWeek].push({ room, floor, day, startHour, endHour, title });
  saveSchedules(schedules);
}
