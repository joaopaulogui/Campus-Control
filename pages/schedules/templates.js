const DAYS = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta"];
const HOURS = [];
for (let h = 8; h <= 17.5; h += 0.5) HOURS.push(h);

function formatHour(hour) {
  const wholeHour = Math.floor(hour);
  const minutes = hour % 1 === 0 ? "00" : "30";
  return `${String(wholeHour).padStart(2, "0")}:${minutes}`;
}

function buildGrid(scheduleList, room) {
  const grid = {};
  HOURS.forEach((hour) => {
    grid[hour] = {};
    DAYS.forEach((day) => {
      grid[hour][day] = null;
    });
  });

  scheduleList
    .filter((item) => item.room === room)
    .forEach((item) => {
      for (let hour = item.startHour; hour < item.endHour; hour += 0.5) {
        if (!grid[hour]) continue;
        grid[hour][item.day] =
          hour === item.startHour
            ? {
                type: "start",
                schedule: item,
                span: (item.endHour - item.startHour) * 2,
              }
            : { type: "skip" };
      }
    });

  return grid;
}

function renderScheduleCard(item) {
  return `
        <div class="schedule-card">
            <p class="bold small-text no-margin">${item.room}</p>
            <p class="green-text small-text no-margin">${item.title}</p>
            <p class="light smaller-text no-margin">${item.floor}</p>
        </div>
    `;
}

function renderGrid(scheduleList, room) {
  if (!room) {
    return `<p class="light small-text">Selecione uma sala para ver os horários.</p>`;
  }

  const grid = buildGrid(scheduleList, room);
  const headerHtml = DAYS.map(
    (day) => `<th class="table-th text bold">${day}</th>`,
  ).join("");

  const rowsHtml = HOURS.map((hour) => {
    const cellsHtml = DAYS.map((day) => {
      const cell = grid[hour][day];
      if (cell?.type === "skip") return "";
      if (cell?.type === "start") {
        return `<td class="schedule-cell" rowspan="${cell.span}">${renderScheduleCard(cell.schedule)}</td>`;
      }
      return `<td class="schedule-cell"></td>`;
    }).join("");

    return `
            <tr>
                <td class="schedule-hour light small-text">${formatHour(hour)}</td>
                ${cellsHtml}
            </tr>
        `;
  }).join("");

  return `
        <table class="table schedule-table">
            <thead class="table-thead">
                <tr><th class="table-th text bold">Horário</th>${headerHtml}</tr>
            </thead>
            <tbody>${rowsHtml}</tbody>
        </table>
    `;
}

function renderRoomSelector(allFloors, allowedFloorNames, selectedRoom) {
  const rooms = [];
  allFloors.forEach((floor) => {
    if (!allowedFloorNames.includes(floor.name)) return;
    floor.rooms.forEach((room) =>
      rooms.push({ name: room.name, floor: floor.name }),
    );
  });

  return `
    <div class="flex-row big-bottom-margin room-selector" style="gap: 8px;">
      ${rooms
        .map(
          (room) => `
        <button class="floor-button bold text room-selector-button ${room.name === selectedRoom ? "active-floor" : ""}" data-select-room="${room.name}">${room.name}</button>
      `,
        )
        .join("")}
    </div>
  `;
}

function renderAvailableRooms(
  allFloors,
  thisWeekSchedules,
  currentDay,
  currentHour,
) {
  const rooms = [];
  allFloors.forEach((floor) => {
    floor.rooms.forEach((room) => {
      const isOccupied = thisWeekSchedules.some(
        (item) =>
          item.room === room.name &&
          item.day === currentDay &&
          currentHour >= item.startHour &&
          currentHour < item.endHour,
      );
      if (!isOccupied) rooms.push({ name: room.name, floor: floor.name });
    });
  });

  if (rooms.length === 0) {
    return `<p class="light small-text">Nenhuma sala disponível agora.</p>`;
  }

  return rooms
    .map(
      (room) => `
        <div class="flex-row small-bottom-margin" style="justify-content: space-between; align-items: center;">
            <div>
                <p class="bold small-text no-margin">${room.name}</p>
                <p class="light smaller-text no-margin">${room.floor}</p>
            </div>
            <button class="base-button bold small-text reserve-button" data-reserve-room="${room.name}">Reservar</button>
        </div>
    `,
    )
    .join("");
}

function renderUpcomingActivities(thisWeekSchedules, currentDay, currentHour) {
  const upcoming = thisWeekSchedules
    .filter((item) => item.day === currentDay && item.startHour > currentHour)
    .sort((a, b) => a.startHour - b.startHour)
    .slice(0, 3);

  if (upcoming.length === 0) {
    return `<p class="light small-text">Nenhuma atividade restante hoje.</p>`;
  }

  return upcoming
    .map(
      (item) => `
        <div class="flex-row small-bottom-margin" style="gap: 12px;">
            <div class="upcoming-bar"></div>
            <div>
                <p class="bold small-text no-margin">${item.title}</p>
                <p class="light smaller-text no-margin">${item.room} - ${item.floor}</p>
                <p class="light smaller-text no-margin">${formatHour(item.startHour)} - ${formatHour(item.endHour)}</p>
            </div>
        </div>
    `,
    )
    .join("");
}

function calculateOccupancy(allFloors, scheduleList) {
  const totalSlotsPerRoom = HOURS.length * DAYS.length;
  let totalSlots = 0;
  let totalOccupied = 0;

  const results = allFloors.map((floor) => {
    const floorTotalSlots = floor.rooms.length * totalSlotsPerRoom;
    const occupiedSlots = scheduleList
      .filter((item) => item.floor === floor.name)
      .reduce((sum, item) => sum + (item.endHour - item.startHour), 0);

    totalSlots += floorTotalSlots;
    totalOccupied += occupiedSlots;

    return {
      name: floor.name,
      percentage:
        floorTotalSlots === 0
          ? 0
          : Math.round((occupiedSlots / floorTotalSlots) * 100),
    };
  });

  const overallPercentage =
    totalSlots === 0 ? 0 : Math.round((totalOccupied / totalSlots) * 100);

  return { results, overallPercentage };
}

function renderOccupancy(allFloors, scheduleList) {
  const { results, overallPercentage } = calculateOccupancy(
    allFloors,
    scheduleList,
  );

  const renderBar = (label, percentage) => `
        <div class="small-bottom-margin">
            <div class="flex-row" style="justify-content: space-between;">
                <span class="small-text">${label}</span>
                <span class="bold small-text">${percentage}%</span>
            </div>
            <div class="occupancy-bar-bg"><div class="occupancy-bar-fill" style="width: ${percentage}%;"></div></div>
        </div>
    `;

  const floorsHtml = results
    .map((floor) => renderBar(floor.name, floor.percentage))
    .join("");
  return floorsHtml + renderBar("Média Geral", overallPercentage);
}

function renderResumePanels(
  allFloors,
  thisWeekSchedules,
  currentDay,
  currentHour,
) {
  return `
        <div class="grid cards">
            <div class="card" style="padding: 24px;">
                <h3 class="bold big-text medium-bottom-margin">Salas Disponíveis Agora</h3>
                ${renderAvailableRooms(allFloors, thisWeekSchedules, currentDay, currentHour)}
            </div>
            <div class="card" style="padding: 24px;">
                <h3 class="bold big-text medium-bottom-margin">Próximas Atividades</h3>
                ${renderUpcomingActivities(thisWeekSchedules, currentDay, currentHour)}
            </div>
            <div class="card" style="padding: 24px;">
                <h3 class="bold big-text medium-bottom-margin">Taxa de Ocupação</h3>
                ${renderOccupancy(allFloors, thisWeekSchedules)}
            </div>
        </div>
    `;
}

function renderWeekToggle(currentWeek) {
  return `
        <div class="flex-row medium-bottom-margin" style="gap: 12px;">
            <button class="base-button bold text week-toggle-button ${currentWeek === "thisWeek" ? "active-floor" : ""}" data-select-week="thisWeek">Esta Semana</button>
            <button class="base-button bold text week-toggle-button ${currentWeek === "nextWeek" ? "active-floor" : ""}" data-select-week="nextWeek">Próxima Semana</button>
        </div>
    `;
}

function renderReservationModal(allFloors) {
  const roomOptionsHtml = allFloors
    .map((floor) =>
      floor.rooms
        .map(
          (room) =>
            `<option value="${room.name}" data-floor="${floor.name}">${room.name} (${floor.name})</option>`,
        )
        .join(""),
    )
    .join("");

  const dayOptionsHtml = DAYS.map(
    (day) => `<option value="${day}">${day}</option>`,
  ).join("");
  const hourOptionsHtml = HOURS.map(
    (hour) => `<option value="${hour}">${formatHour(hour)}</option>`,
  ).join("");
  const endHourOptionsHtml = [...HOURS, 18, 18.5]
    .map((hour) => `<option value="${hour}">${formatHour(hour)}</option>`)
    .join("");

  return `
        <div id="reservation-modal-overlay" class="modal-overlay hidden">
            <div class="card modal-box" style="padding: 24px;">
                <div class="flex-row medium-bottom-margin" style="justify-content: space-between; align-items: center;">
                    <h3 class="bold big-text no-margin">Nova Reserva</h3>
                    <button id="close-modal-button" type="button" class="base-button bold text" style="background-color: transparent;">✕</button>
                </div>
                <form id="reservation-form">
                    <div class="small-bottom-margin">
                        <label class="bold small-text small-bottom-margin" style="display: block;">Sala</label>
                        <select id="reservation-room" class="modal-input" required>${roomOptionsHtml}</select>
                    </div>
                    <div class="small-bottom-margin">
                        <label class="bold small-text small-bottom-margin" style="display: block;">Dia</label>
                        <select id="reservation-day" class="modal-input" required>${dayOptionsHtml}</select>
                    </div>
                    <div class="flex-row small-bottom-margin" style="gap: 12px;">
                        <div style="flex: 1;">
                            <label class="bold small-text small-bottom-margin" style="display: block;">Início</label>
                            <select id="reservation-start" class="modal-input" required>${hourOptionsHtml}</select>
                        </div>
                        <div style="flex: 1;">
                            <label class="bold small-text small-bottom-margin" style="display: block;">Fim</label>
                            <select id="reservation-end" class="modal-input" required>${endHourOptionsHtml}</select>
                        </div>
                    </div>
                    <div class="medium-bottom-margin">
                        <label class="bold small-text small-bottom-margin" style="display: block;">Título</label>
                        <input type="text" id="reservation-title" class="modal-input" placeholder="Ex: Reunião de Equipe" required>
                    </div>
                    <button type="submit" class="base-button bold text" style="background-color: #2d6a4f; color: #ffffff; width: 100%; padding: 10px;">Confirmar Reserva</button>
                </form>
            </div>
        </div>
    `;
}
