const floors = getFloors()

function renderFloorResume(floor) {
    const totalRooms = floor.rooms.length
    var openRooms = 0;

    floor.rooms.forEach(room => {
        if (room.status == "unlocked") {openRooms++;}
    });

    const lockedRooms = totalRooms - openRooms;

    return `
        <div class="card" style="padding: 24px;">
            <h3 class="bold big-text medium-bottom-margin">${floor.name}</h3>
            <div class="flex-row" style="gap: 16px;">
                <div class="flex-column" style="flex: 1;">
                    <p class="light small-text smaller-bottom-margin">Total</p>
                    <p class="bold large-text no-margin">${totalRooms}</p>
                </div>
                <div class="flex-column" style="flex: 1;">
                    <p class="light small-text smaller-bottom-margin">Abertas</p>
                    <p class="bold large-text green-text no-margin">${openRooms}</p>
                </div>
                <div class="flex-column" style="flex: 1;">
                    <p class="light small-text smaller-bottom-margin">Trancadas</p>
                    <p class="light bold large-text no-margin">${lockedRooms}</p>
                </div>
            </div>
        </div>
    `;
}

function getDoorIcon(status) {
    if (status == "unlocked") {
        return `
            <svg class="logo-vec door-icon unlocked" viewBox="0 0 24 24">
                <path d="M13 4h3a2 2 0 0 1 2 2v14"></path>
                <path d="M2 20h3"></path>
                <path d="M13 20h9"></path>
                <path d="M10 12v.01"></path>
                <path d="M13 4.562v16.157a1 1 0 0 1-1.242.97L5 20V5.562a2 2 0 0 1 1.515-1.94l4-1A2 2 0 0 1 13 4.561Z"></path>'
            </svg>
        `;
    }

    return `
        <svg class="logo-vec door-icon locked" viewBox="0 0 24 24">
            <path d="M18 20V6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v14"></path>
            <path d="M2 20h20"></path>
            <path d<path d="M14 12v.01"></path>="M13 20h9"></path>
        </svg>
    `;
}

function getLockIcon(status) {
    if (status == "unlocked") {
        return `
            <svg class="logo-vec lock-icon unlocked" viewBox="0 0 24 24">
                <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 9.9-1"></path>
            </svg>
        `;
    }

    return `
        <svg class="logo-vec lock-icon locked" viewBox="0 0 24 24">
            <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
        </svg>
    `;
}

function renderTableRow(floorName, room) {
    return `
        <tr class="gray-border-bottom">
            <td class="table-td">
                <div class="flex-row" style="gap: 12px;">
                    ${getDoorIcon(room.status)}
                    <span class="bold small-text">${room.name}</span>
                </div>
            </td>
            <td class="small-text table-td">${floorName}</td>
            <td class="small-text table-td">${room.type}</td>
            <td class="small-text table-td">${room.capacity}</td>
            <td class="small-text table-td">
                <div class="flex-row ${room.status}-status-label">
                    ${getLockIcon(room.status)}
                    <span class="bold smaller-text">${room.status == "unlocked" ? "Destrancada" : "Trancada"}</span>
                </div>
            </td>
            <td class="table-td">
                <button class="base-button bold small-text ${room.status == "unlocked" ? "lock" : "unlock"}-button" data-toggle-door="${room.name}">${room.status == "unlocked" ? "Trancar" : "Destrancar"}</button>
            </td>
        </tr>
    `;
}

function toggleDoor(roomName) {
    for (const floor of floors) {
        const room = floor.rooms.find(item => item.name === roomName)
        if (room) {
            if (room.status == "locked") {
                room.status = "unlocked";
            } else if (room.status == "unlocked") {
                room.status = "locked";
            }
        }
    }

    saveFloors(floors)
    renderFloorsResume()
    renderRoomsTable()
}

function renderFloorsResume() {
    const floorsResumeHtml = floors.map(floor => renderFloorResume(floor)).join('');

    const html = `
        <div class="grid cards big-bottom-margin">
            ${floorsResumeHtml}
        </div>
    `;

    document.getElementById('floors-resume').innerHTML = html;
}

function renderRoomsTable() {
    const tableRowsHtml = floors.map(floor => 
        floor.rooms.map(room => renderTableRow(floor.name, room)).join('')
    ).join('');

    const html = `
        <div class="card">
            <table class="table">
                <thead class="table-thead">
                    <tr>
                        <th class="table-th light bold smaller-text">Sala</th>
                        <th class="table-th light bold smaller-text">Andar</th>
                        <th class="table-th light bold smaller-text">Tipo</th>
                        <th class="table-th light bold smaller-text">Capacidade</th>
                        <th class="table-th light bold smaller-text">Status</th>
                        <th class="table-th light bold smaller-text">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    ${tableRowsHtml}
                </tbody>
            </table>
        </div>
    `;

    document.getElementById('rooms-table').innerHTML = html;
}

document.getElementById('rooms-table').addEventListener('click', (event) => {
    const button = event.target.closest('[data-toggle-door]');
    if (button) {
        toggleDoor(button.dataset.toggleDoor);
    }
});

renderRoomsTable()
renderFloorsResume()