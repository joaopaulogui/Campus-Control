function getStatsIcon(label) {
    switch (label) {
        case "Salas Abertas":
            return getIcon("openDoor"); 
        case "ACs Ligados":
            return getIcon("air"); 
        case "Itens Emprestados":
            return getIcon("box"); 
        case "Utilização":
            return getIcon("pulse");  
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