let allFloors = [];
let floors = [];
let search = "";

async function loadRoomsPage() {
    try {
        allFloors = await getFloorsFromApi();
        floors = allFloors;

        initFloorFilter(allFloors, () => {
            renderRoomsTable();
            renderFloorsResume();
        });

        renderRoomsTable();
        renderFloorsResume();
    } catch (error) {
        console.error("Não foi possível carregar as salas.", error);
        document.getElementById('rooms-table').innerHTML = `
            <div class="card">
                <p class="bold text">Não foi possível carregar os dados das salas.</p>
            </div>
        `;
    }
}

function renderFloorsResume() {
    if (!allFloors.length) {
        return;
    }

    const floorsResumeHtml = allFloors.map(floor => renderFloorResume(floor)).join('');

    const html = `
        <div class="grid cards big-bottom-margin">
            ${floorsResumeHtml}
        </div>
    `;

    document.getElementById('floors-resume').innerHTML = html;
}

function renderRoomsTable() {
    if (!floors.length) {
        return;
    }

    const headers = [ "Sala", "Andar", "Tipo", "Capacidade", "Status", "Ações" ];

    const thRowsHtml = headers.map(header => `<th class="table-th light bold smaller-text">${header}</th>`).join('');
    const tableRowsHtml = floors.map(floor => 
        floor.rooms.map(room => room.name.toLowerCase().includes(search.toLowerCase()) ? renderTableRow(floor.name, room) : '').join('')
    ).join('');

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

document.getElementById("search-container").innerHTML = renderSearchField("rooms-search", "Buscar empréstimos por item...");

document.getElementById("search-container").addEventListener("input", (event) => {
  if (event.target.id === "rooms-search") {
    search = event.target.value;
    renderRoomsTable();
  }
});

loadRoomsPage();