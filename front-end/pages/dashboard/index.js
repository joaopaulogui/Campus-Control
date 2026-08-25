const floors = getFloors();
const loans = getLoans();

const stats = getCampusStats(floors);
const loansStats = getLoansStats(loans);

function getLoansStats(loans) {
  const totalLoans = loans.length;
  let activeLoans = 0;

  loans.forEach((loan) => {
    if (loan.status === "in-use") {
      activeLoans++;
    }
  });

  return {
    totalLoans,
    activeLoans,
  };
}

function getCampusStats(floors) {
  let totalRooms = 0;
  let openRooms = 0;
  let activeAcs = 0;

  floors.forEach((floor) => {
    totalRooms += floor.rooms.length;

    floor.rooms.forEach((room) => {
      if (room.isLocked === false) {
        openRooms++;
      }

      if (room.ac.isOn) {
        activeAcs++;
      }
    });
  });

  return {
    totalRooms,
    openRooms,
    activeAcs,
  };
}

function renderStatsResume() {
  const cardsHtml = [
    renderStatsCard(
      "Salas Abertas",
      `${stats.openRooms}/${stats.totalRooms}`,
      `${stats.totalRooms - stats.openRooms} salas em uso agora`,
      getStatsIcon("Salas Abertas"),
    ),

    renderStatsCard(
      "ACs Ligados",
      `${stats.activeAcs}/${stats.totalRooms}`,
      `Economia de ${Math.round(
        (1 - stats.activeAcs / stats.totalRooms) * 100,
      )}% de energia`,
      getStatsIcon("ACs Ligados"),
    ),

    renderStatsCard(
      "Itens Emprestados",
      `${loansStats.activeLoans}/${loansStats.totalLoans}`,
      "3 devoluções previstas hoje",
      getStatsIcon("Itens Emprestados"),
    ),

    renderStatsCard(
      "Utilização",
      `${Math.round((1 - stats.activeAcs / stats.totalRooms) * 100)}%`,
      "Pico às 14h (85%)",
      getStatsIcon("Utilização"),
    ),
  ].join("");

  document.getElementById("stats-resume").innerHTML = `
        <div class="grid cards big-bottom-margin">
            ${cardsHtml}
        </div>
    `;
}

function renderStatsByFloor() {
  const statsByFloorHtml = floors
    .map((floor) => renderStatsFloor(floor))
    .join("");

  document.getElementById("stats-by-floor").innerHTML = `
        <h3 class="bigger-text medium-bottom-margin" style="font-weight:600">
            Status por Andar
        </h3>

        ${statsByFloorHtml}
    `;
}

renderStatsResume();
renderStatsByFloor();
