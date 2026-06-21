const floors = getFloors()
const stats = getCampusStats(floors);

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

function getStatsIcon(label) {
    switch (label) {
        case "Salas Abertas":
            return `
                <path d="M13 4h3a2 2 0 0 1 2 2v14"></path>
                <path d="M2 20h3"></path>
                <path d="M13 20h9"></path>
                <path d="M10 12v.01"></path>
                <path d="M13 4.562v16.157a1 1 0 0 1-1.242.97L5 20V5.562a2 2 0 0 1 1.515-1.94l4-1A2 2 0 0 1 13 4.561Z"></path>
            `; 
        case "ACs Ligados":
            return `
                <path d="M12.8 19.6A2 2 0 1 0 14 16H2"></path>
                <path d="M17.5 8a2.5 2.5 0 1 1 2 4H2"></path>
                <path d="M9.8 4.4A2 2 0 1 1 11 8H2"></path>
            `; 
        case "Itens Emprestados":
            return `
                <path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z"></path>
                <path d="M12 22V12"></path>
                <polyline points="3.29 7 12 12 20.71 7"></polyline>
                <path d="m7.5 4.27 9 5.15"></path>'
            `; 
        case "Utilização":
            return `
                <path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"></path>
            `; 
    }
}

function renderStatsCard(label, value, info, iconPaths) {
    return `
        <div class="card" style="padding: 24px;">
            <div class="flex-row">
                <div class="flex-column">
                    <p class="light small-text smaller-bottom-margin">${label}</p>
                    <h3 class="larger-text small-bottom-margin" style="font-weight: 600;">${value}</h3>
                    <p class="small-text green-text no-margin">${info}</p>
                </div>
                <div class="logo dashboard-logo">
                    <svg class="logo-vec dashboard-logo-vec" viewBox="0 0 24 24">
                        ${iconPaths}
                    </svg>
                </div>
            </div>
        </div>
    `;
}

function renderStatsFloor(floor) {
    const totalRooms = floor.rooms.length;
    var openRooms = 0;
    var activeAcs = 0;

    floor.rooms.forEach(room => {
        if (room.status == "unlocked") { openRooms++; }
        if (room.ac.isOn) { activeAcs++; }
    });

    return `
        <div class="gray-grid-item medium-bottom-margin">
            <h4 class="text" style="font-weight: 600; margin: 0px 0px 12px 0px;">${floor.name}</h4>
            <div class="flex-row" style="gap: 18px; width: 100%; flex: 1;">
                <div class="flex-column" style="flex: 1;">
                    <p class="light small-text no-margin">Salas Abertas</p>
                    <p class="big-text no-margin bold">${openRooms}/${totalRooms}</p>
                </div>
                <div class="flex-column" style="flex: 1;">
                    <p class="light small-text no-margin">ACs Ativos</p>
                    <p class="big-text no-margin bold">${activeAcs}/${totalRooms}</p>
                </div>
            </div>
        </div>
    `;
}

function renderGrayCard(label, value, info) {
    return `
        <div class="gray-grid-item">
            <p class="light small-text smaller-bottom-margin">${label}</p>
            <p class="bold large-text" style="margin: 0px 0px 12px 0px;">${value}</p>
            <p class="light smaller-text no-margin">${info}</p>
        </div>
    `;
}

function renderStatsResume() {
    const cardsHtml = [
        renderStatsCard("Salas Abertas", `${stats.openRooms}/${stats.totalRooms}`, `${stats.totalRooms-stats.openRooms} salas em uso agora`, getStatsIcon("Salas Abertas")),
        renderStatsCard("ACs Ligados", `${stats.activeAcs}/${stats.totalRooms}`, `Economia de ${Math.round((1-(stats.activeAcs/stats.totalRooms))*100)}% de energia`, getStatsIcon("ACs Ligados")),
        renderStatsCard("Itens Emprestados", "7/12", "3 devoluções previstas hoje", getStatsIcon("Itens Emprestados")),
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

renderStatsByFloor()
renderStatsResume()
renderCampusResume()