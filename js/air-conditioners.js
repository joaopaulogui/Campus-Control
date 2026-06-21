const allFloors = getFloors()
let floors = allFloors;

initFloorFilter(allFloors, () => {
    renderAcsResume();
    renderAcCards();
})

function chooseIcon(acClass) {
    switch(acClass) {
        case "working":
            return `<svg class="logo-vec working ac-icons-vec" viewBox="0 0 24 24"><path d="M21.801 10A10 10 0 1 1 17 3.335"></path><path d="m9 11 3 3L22 4"></path></svg>`
        case "warning":
            return `<svg class="logo-vec warning ac-icons-vec" viewBox="0 0 24 24"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"></path><path d="M12 9v4"></path><path d="M12 17h.01"></path></svg>`
        case "broken":
            return `<svg class="logo-vec broken ac-icons-vec" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><path d="m15 9-6 6"></path><path d="m9 9 6 6"></path></svg>`
    }
}

function chooseLabel(acClass) {
    switch(acClass) {
        case "working":
            return "Funcionando"
        case "warning":
            return "Com Defeito"
        case "broken":
            return "Quebrado"
    }
}

function renderButtons(item) {
    if(item.ac.isOn) {
        return `<button class="bold text base-button on-off-button on flex-row small-bottom-margin" data-toggle-ac="${item.name}">
            <svg class="logo-vec ac-on-off-vec" viewBox="0 0 24 24">
                <path d="M12 2v10"></path>
                <path d="M18.4 6.6a9 9 0 1 1-12.77.04"></path>
            </svg>
            Desligar
        </button>
        <div class="flex-row" style="justify-content: space-between; gap: 8px;">
            <button class="base-button bold small-text temp-control-button" data-decrease-temp="${item.name}">- 1°C</button>
            <button class="base-button bold small-text temp-control-button" data-increase-temp="${item.name}">+ 1°C</button>
        </div>`
    } else {
        return `<button class="bold text base-button on-off-button off flex-row"  data-toggle-ac="${item.name}">
            <svg class="logo-vec ac-on-off-vec" viewBox="0 0 24 24">
                <path d="M12 2v10"></path>
                <path d="M18.4 6.6a9 9 0 1 1-12.77.04"></path>
            </svg>
            Ligar
        </button>`
    }
}

function renderResume(floorName, rooms) {
    const totalRooms = rooms.length;
    let activeAcs = 0;
    let workingAcs = 0;
    let defectiveAcs = 0;
    let brokenAcs = 0;

    rooms.forEach(room => {
        if (room.ac.isOn) { activeAcs++; }
        switch(room.ac.class) {
            case "working":
                workingAcs++;
                break;
            case "warning":
                defectiveAcs++;
                break;
            case "broken":
                brokenAcs++;
                break;
        }
    });

    return `
        <div class="card" style="padding: 24px;">
            <h3 class="bold big-text medium-bottom-margin">${floorName}</h3>
            <div class="flex-row gray-border-bottom small-bottom-margin" style="padding: 0px 0px 24px 0px;">
                <div class="flex-column" style="flex: 1;">
                    <p class="light small-text smaller-bottom-margin">Total de Salas</p>
                    <p class="bold large-text no-margin">${totalRooms}</p>
                </div>
                <div class="flex-column" style="flex: 1;">
                    <p class="light small-text smaller-bottom-margin">ACs Ligados</p>
                    <p class="bold large-text no-margin">${activeAcs}/${totalRooms}</p>
                </div>
            </div>
            <div class="flex-row" style="gap: 16px;">
                <div class="flex-row" style="gap: 8px; align-items: center;">
                    <svg class="logo-vec working ac-icons-vec" viewBox="0 0 24 24">
                        <path d="M21.801 10A10 10 0 1 1 17 3.335"></path>
                        <path d="m9 11 3 3L22 4"></path>
                    </svg>
                    <span class="light small-text">${workingAcs}</span>
                </div>
                <div class="flex-row" style="gap: 8px; align-items: center;">
                    <svg class="logo-vec warning ac-icons-vec" viewBox="0 0 24 24">
                        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"></path>
                        <path d="M12 9v4"></path>
                        <path d="M12 17h.01"></path>
                    </svg>
                    <span class="light small-text">${defectiveAcs}</span>
                </div>
                <div class="flex-row" style="gap: 8px; align-items: center;">
                    <svg class="logo-vec broken ac-icons-vec" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="m15 9-6 6"></path>
                        <path d="m9 9 6 6"></path>
                    </svg>
                    <span class="light small-text">${brokenAcs}</span>
                </div>
            </div>
        </div>
    `;
}

function renderCard(floorName, rooms) {
    const cardsHtml = rooms.map(item => `
        <div class="card ac-card ${item.ac.class}" style="padding: 24px;">
            <div class="flex-row medium-bottom-margin" style="justify-content: space-between;">
                <div>
                    <h3 class="bold bigger-text no-margin">${item.name}</h3>
                    <p class="light small-text no-margin">${floorName}</p>
                </div>
                <div class="logo ac-logo">
                    <svg class="logo-vec ac-logo-vec" viewBox="0 0 24 24">
                        <path d="M12.8 19.6A2 2 0 1 0 14 16H2"></path>
                        <path d="M17.5 8a2.5 2.5 0 1 1 2 4H2"></path>
                        <path d="M9.8 4.4A2 2 0 1 1 11 8H2"></path>
                    </svg>
                </div>
            </div>
            <div class="label flex-row ac-status ${item.ac.class}-label medium-bottom-margin" style="padding: 12px; justify-content: space-between;">
                <div class="label flex-row" style="gap: 8px; align-items: center;">
                    ${chooseIcon(item.ac.class)}
                    <span class="bold small-text ${item.ac.class}">${chooseLabel(item.ac.class)}</span>
                </div>
                <svg class="logo-vec ac-config-vec" viewBox="0 0 24 24">
                    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                </svg>
            </div>
            <div class="flex-row small-bottom-margin" style="gap: 8px; align-items: center;">
                <svg class="logo-vec ac-config-vec" viewBox="0 0 24 24">
                    <path d="M12 9a4 4 0 0 0-2 7.5"></path>
                    <path d="M12 3v2"></path>
                    <path d="m6.6 18.4-1.4 1.4"></path>
                    <path d="M20 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"></path>
                    <path d="M4 13H2"></path>
                    <path d="M6.34 7.34 4.93 5.93"></path>
                </svg>
                <span class="light small-text">Temperatura</span>
            </div>
            <div class="flex-row small-bottom-margin" style="gap: 4px; align-items: baseline;">
                <span class="bold larger-text">${item.ac.temperature}</span>
                <span class="light big-text">°C</span>
            </div>
            ${renderButtons(item)}
        </div>
    `).join('');

    return `
        <h3 class="bold big-text medium-bottom-margin gray-border-bottom" style="padding: 0px 0px 8px 0px;">${floorName}</h3>
        <div class="grid cards bigger-bottom-margin" style="grid-template-columns: repeat(3, minmax(212px, 1fr));">${cardsHtml}</div>
    `
}

function toggleAc(roomRame) {
    for (const floor of floors) {
        const room = floor.rooms.find(item => item.name === roomRame);
        if (room) {
            room.ac.isOn = !room.ac.isOn;
            break;
        }
    }

    saveFloors(floors);
    renderAcsResume();
    renderAcCards();
}

function decreaseTemp(roomRame) {
    for (const floor of floors) {
        const room = floor.rooms.find(item => item.name === roomRame);
        if (room) {
            room.ac.temperature--;
            break;
        }
    }

    saveFloors(floors);
    renderAcsResume();
    renderAcCards();
}

function increaseTemp(roomRame) {
    for (const floor of floors) {
        const room = floor.rooms.find(item => item.name === roomRame);
        if (room) {
            room.ac.temperature++;
            break;
        }
    }

    saveFloors(floors);
    renderAcsResume();
    renderAcCards();
}

function renderAcsResume() {
    const html = allFloors.map(floor => renderResume(floor.name, floor.rooms)).join('');

    const finalHtml = `
        <div class="grid cards big-bottom-margin">${html}</div>
    `

    document.getElementById('acs-resume').innerHTML = finalHtml;
}

function renderAcCards() {
    const html = floors.map(floor => renderCard(floor.name, floor.rooms)).join('');

    const finalHtml = `
        <div class="flex-column">${html}</div>
    `

    document.getElementById('ac-cards').innerHTML = finalHtml;
}

document.getElementById('ac-cards').addEventListener('click', (event) => {
    const button = event.target.closest('[data-decrease-temp]');
    if (button) {
        decreaseTemp(button.dataset.decreaseTemp);
    }
});

document.getElementById('ac-cards').addEventListener('click', (event) => {
    const button = event.target.closest('[data-increase-temp]');
    if (button) {
        increaseTemp(button.dataset.increaseTemp);
    }
});

document.getElementById('ac-cards').addEventListener('click', (event) => {
    const button = event.target.closest('[data-toggle-ac]');
    if (button) {
        toggleAc(button.dataset.toggleAc);
    }
});

renderAcsResume();
renderAcCards();