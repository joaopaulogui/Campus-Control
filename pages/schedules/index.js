const allFloors = getFloors();
let floors = allFloors;
const schedules = getSchedules();
let currentWeek = "thisWeek";
let selectedRoom = null;

const WEEKDAY_NAMES = [
  "Domingo",
  "Segunda",
  "Terça",
  "Quarta",
  "Quinta",
  "Sexta",
  "Sábado",
];

function getCurrentDayAndHour() {
  const now = new Date();
  let dayName = WEEKDAY_NAMES[now.getDay()];
  if (dayName === "Domingo" || dayName === "Sábado") dayName = "Segunda";
  return { day: dayName, hour: now.getHours() };
}

function getAllowedFloorNames() {
  return floors.map((floor) => floor.name);
}

function getAllowedRooms() {
  const rooms = [];
  allFloors.forEach((floor) => {
    if (!getAllowedFloorNames().includes(floor.name)) return;
    floor.rooms.forEach((room) => rooms.push(room.name));
  });
  return rooms;
}

function renderRoomSelectorSection() {
  document.getElementById("room-selector").innerHTML = renderRoomSelector(
    allFloors,
    getAllowedFloorNames(),
    selectedRoom,
  );
}

function renderGridSection() {
  document.getElementById("schedule-grid").innerHTML = renderGrid(
    schedules[currentWeek],
    selectedRoom,
  );
}

function renderResumeSection() {
  const { day, hour } = getCurrentDayAndHour();
  document.getElementById("schedule-resume").innerHTML = renderResumePanels(
    allFloors,
    schedules.thisWeek,
    day,
    hour,
  );
}

function renderWeekToggleSection() {
  document.getElementById("week-toggle").innerHTML =
    renderWeekToggle(currentWeek);
}

function openModal(presetRoom) {
  document
    .getElementById("reservation-modal-overlay")
    .classList.remove("hidden");
  document.getElementById("reservation-form").reset();
  if (presetRoom)
    document.getElementById("reservation-room").value = presetRoom;
}

function closeModal() {
  document.getElementById("reservation-modal-overlay").classList.add("hidden");
}

initFloorFilter(allFloors, () => {
  const allowedRooms = getAllowedRooms();
  if (!allowedRooms.includes(selectedRoom)) {
    selectedRoom = allowedRooms[0] || null;
  }
  renderRoomSelectorSection();
  renderGridSection();
});

document.getElementById("modal-container").innerHTML =
  renderReservationModal(allFloors);

document.getElementById("week-toggle").addEventListener("click", (event) => {
  const button = event.target.closest("[data-select-week]");
  if (button) {
    currentWeek = button.dataset.selectWeek;
    renderWeekToggleSection();
    renderGridSection();
  }
});

document.getElementById("room-selector").addEventListener("click", (event) => {
  const button = event.target.closest("[data-select-room]");
  if (button) {
    selectedRoom = button.dataset.selectRoom;
    renderRoomSelectorSection();
    renderGridSection();
  }
});

document
  .getElementById("new-reservation-button")
  .addEventListener("click", () => openModal(null));

document
  .getElementById("schedule-resume")
  .addEventListener("click", (event) => {
    const button = event.target.closest("[data-reserve-room]");
    if (button) openModal(button.dataset.reserveRoom);
  });

document
  .getElementById("close-modal-button")
  .addEventListener("click", closeModal);

document
  .getElementById("reservation-modal-overlay")
  .addEventListener("click", (event) => {
    if (event.target.id === "reservation-modal-overlay") closeModal();
  });

document
  .getElementById("reservation-form")
  .addEventListener("submit", (event) => {
    event.preventDefault();

    const roomSelect = document.getElementById("reservation-room");
    const room = roomSelect.value;
    const floor = roomSelect.selectedOptions[0].dataset.floor;
    const day = document.getElementById("reservation-day").value;
    const startHour = parseFloat(
      document.getElementById("reservation-start").value,
    );
    const endHour = parseFloat(
      document.getElementById("reservation-end").value,
    );
    const title = document.getElementById("reservation-title").value.trim();

    if (endHour <= startHour) {
      alert("O horário de término deve ser depois do início.");
      return;
    }
    if (hasConflict(schedules[currentWeek], room, day, startHour, endHour)) {
      alert("Essa sala já está reservada nesse horário.");
      return;
    }

    addReservation(
      schedules,
      currentWeek,
      room,
      floor,
      day,
      startHour,
      endHour,
      title,
    );
    selectedRoom = room;
    closeModal();
    renderRoomSelectorSection();
    renderGridSection();
    renderResumeSection();
  });

selectedRoom = getAllowedRooms()[0] || null;
renderWeekToggleSection();
renderRoomSelectorSection();
renderGridSection();
renderResumeSection();
