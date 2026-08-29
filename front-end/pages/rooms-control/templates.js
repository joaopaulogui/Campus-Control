function renderFloorResume(floor) {
    const totalRooms = floor.rooms.length
    var openRooms = 0;

    floor.rooms.forEach(room => {
        if (!room.isLocked) {openRooms++;}
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

function getDoorIcon(isLocked) {
    if (!isLocked) {
        return `
            <svg class="logo-vec door-icon unlocked" viewBox="0 0 24 24">
                ${getIcon("openDoor")}
            </svg>
        `;
    }

    return `
        <svg class="logo-vec door-icon locked" viewBox="0 0 24 24">
            ${getIcon("closedDoor")}
        </svg>
    `;
}

function getLockIcon(isLocked) {
    if (!isLocked) {
        return `
            <svg class="logo-vec lock-icon unlocked" viewBox="0 0 24 24">
                ${getIcon("openPadlock")} 
            </svg>
        `;
    }

    return `
        <svg class="logo-vec lock-icon locked" viewBox="0 0 24 24">
            ${getIcon("closedPadlock")} 
        </svg>
    `;
}

function renderTableRow(floorName, room) {
    return `
        <tr class="gray-border-bottom">
            <td class="table-td">
                <div class="flex-row" style="gap: 12px;">
                    ${getDoorIcon(room.isLocked)}
                    <span class="bold small-text">${room.name}</span>
                </div>
            </td>
            <td class="small-text table-td">${floorName}</td>
            <td class="small-text table-td">${room.type}</td>
            <td class="small-text table-td">${room.capacity}</td>
            <td class="small-text table-td">
                <div class="flex-row ${room.isLocked ? "locked"  : "unlocked"}-status-label">
                    ${getLockIcon(room.isLocked)}
                    <span class="bold smaller-text">${room.isLocked ? "Trancada" : "Destrancada"}</span>
                </div>
            </td>
            <td class="table-td">
                <button class="base-button bold small-text ${room.isLocked ? "unlock" : "lock"}-button" data-toggle-door="${room.name}">${room.isLocked ? "Destrancar" : "Trancar"}</button>
            </td>
        </tr>
    `;
}