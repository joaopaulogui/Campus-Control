const allFloors = getFloors();
let floors = allFloors;

initFloorFilter(allFloors, () => {
    renderRoomsTable()
    renderFloorsResume()
});

function renderFloorsResume() {
    const floorsResumeHtml = allFloors.map(floor => renderFloorResume(floor)).join('');

    const html = `
        <div class="grid cards big-bottom-margin">
            ${floorsResumeHtml}
        </div>
    `;

    document.getElementById('floors-resume').innerHTML = html;
}

function renderRoomsTable() {
    const headers = [ "Sala", "Andar", "Tipo", "Capacidade", "Status", "Ações" ];

    const thRowsHtml = headers.map(header => `<th class="table-th light bold smaller-text">${header}</th>`).join('');
    const tableRowsHtml = floors.map(floor => floor.rooms.map(room => renderTableRow(floor.name, room)).join('')).join('');

    const html = `
        <div class="card">
            <table class="table">
                <thead class="table-thead">
                    <tr>
                        ${thRowsHtml}
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

renderRoomsTable();
renderFloorsResume();