const allFloors = getFloors()
let floors = allFloors;

initFloorFilter(allFloors, () => {
    renderSchedules()
});

function renderSchedules() {
    const html = `
        <div class="card" style="padding: 24px;">
            <div class="flex-row medium-bottom-margin">
                <button class="base-button">Esta semana</button>
                <button class="base-button">Próxima semana</button>
            </div>
        </div>
    `;

    document.getElementById('schedules').innerHTML = html;
}

renderSchedules()