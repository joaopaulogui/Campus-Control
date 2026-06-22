const allFloors = getFloors();
let floors = allFloors;

initFloorFilter(allFloors, () => {
    renderAcsResume();
    renderAcCards();
})

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