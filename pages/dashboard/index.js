const floors = getFloors();
const loans = getLoans();
const stats = getCampusStats(floors);
const loansStats = getLoansStats(loans);

function getLoansStats(loans) {
    const totalLoans = loans.length;
    let activeLoans = 0;

    loans.forEach(loan => {
        if (loan.status === "in-use") { activeLoans++; }
    });

    return {
        totalLoans,
        activeLoans,
    }
}

function getCampusStats(floors) {
    let totalRooms = 0;
    let openRooms = 0;
    let activeAcs = 0;
    let roomsString = "";
    let totalLabs = 0;
    let availableLabs = 3;
    let totalClassrooms = 0;
    let availableClassrooms = 4;
    
    floors.forEach(floor => {
        totalRooms += floor.rooms.length;
        roomsString += `${floor.rooms.length} no ${floor.name}, `;

        floor.rooms.forEach(room => {
            if (room.status == "unlocked") {
                openRooms++;
            }
            if (room.ac.isOn) {
                activeAcs++;
            }

            switch (room.type) {
                case "Sala de Aula":
                    totalClassrooms++;
                    break
                case "Laboratório":
                    totalLabs++;
                    break
            }
        });
    });

    return {
        totalRooms,
        openRooms,
        activeAcs,
        roomsString: roomsString.slice(0, -2),
        totalLabs,
        availableLabs,
        totalClassrooms,
        unavailableClassrooms: totalClassrooms - availableClassrooms,
    }
}

function renderStatsResume() {
    const cardsHtml = [
        renderStatsCard("Salas Abertas", `${stats.openRooms}/${stats.totalRooms}`, `${stats.totalRooms-stats.openRooms} salas em uso agora`, getStatsIcon("Salas Abertas")),
        renderStatsCard("ACs Ligados", `${stats.activeAcs}/${stats.totalRooms}`, `Economia de ${Math.round((1-(stats.activeAcs/stats.totalRooms))*100)}% de energia`, getStatsIcon("ACs Ligados")),
        renderStatsCard("Itens Emprestados", `${loansStats.activeLoans}/${loansStats.totalLoans}`, "3 devoluções previstas hoje", getStatsIcon("Itens Emprestados")),
        renderStatsCard("Utilização", `${Math.round((1-(stats.activeAcs/stats.totalRooms))*100)}%`, "Pico às 14h (85%)", getStatsIcon("Utilização")),
    ].join('');

    const html = `
        <div class="grid cards big-bottom-margin">
            ${cardsHtml}
        </div>
    `;

    document.getElementById('stats-resume').innerHTML = html;
}

function renderStatsByFloor() {
    const statsByFloorHtml = floors.map(floor => renderStatsFloor(floor)).join('');
    
    const html = `
        <h3 class="bigger-text medium-bottom-margin" style="font-weight: 600;">Status por Andar</h3>
        ${statsByFloorHtml}
    `;

    document.getElementById('stats-by-floor').innerHTML = html;
}

function renderCampusResume() {
    const cardsHtml = [
        renderGrayCard("Total de Salas", stats.totalRooms, stats.roomsString),
        renderGrayCard("Laboratórios", stats.totalLabs, `${stats.availableLabs} disponíveis agora`),
        renderGrayCard("Salas de Aula", stats.totalClassrooms, `${stats.unavailableClassrooms} em uso atualmente`),
        renderGrayCard("Ocupação média", "58%", "Esta semana"),
    ].join('');

    const html = `
        <div class="card" style="padding: 24px;">
            <h3 class="bold big-text medium-bottom-margin">Resumo do Campus</h3>
            <div class="grid" style="gap: 16px;">
                ${cardsHtml}
            </div>
        </div>
    `;

    document.getElementById('campus-resume').innerHTML = html;
}

renderStatsResume();
renderStatsByFloor();
renderCampusResume();