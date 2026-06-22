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