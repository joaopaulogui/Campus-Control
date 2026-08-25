const allFloors = getFloors();
let floors = allFloors;
let search = "";

initFloorFilter(allFloors, () => {
  renderAcsResume();
  renderAcCards();
});

function renderAcsResume() {
  const html = allFloors
    .map((floor) => renderResume(floor.name, floor.rooms))
    .join("");
  document.getElementById("acs-resume").innerHTML =
    `<div class="grid cards big-bottom-margin">${html}</div>`;
}

function renderAcCards() {
  const html = floors
    .map((floor) => renderCard(floor.name, floor.rooms))
    .join("");
  document.getElementById("ac-cards").innerHTML =
    `<div class="flex-column">${html}</div>`;
}

document.getElementById("ac-cards").addEventListener("click", (event) => {
  const decreaseButton = event.target.closest("[data-decrease-temp]");
  if (decreaseButton) return decreaseTemp(decreaseButton.dataset.decreaseTemp);

  const increaseButton = event.target.closest("[data-increase-temp]");
  if (increaseButton) return increaseTemp(increaseButton.dataset.increaseTemp);

  const toggleButton = event.target.closest("[data-toggle-ac]");
  if (toggleButton) return toggleAc(toggleButton.dataset.toggleAc);
});

document.getElementById("ac-cards").addEventListener("change", (event) => {
  const select = event.target.closest("[data-change-status]");
  if (select) changeAcStatus(select.dataset.changeStatus, select.value);
});

document.getElementById("search-container").innerHTML = renderSearchField(
  "ac-search",
  "Buscar sala...",
);
document
  .getElementById("search-container")
  .addEventListener("input", (event) => {
    if (event.target.id === "ac-search") {
      search = event.target.value;
      renderAcCards();
    }
  });

renderAcsResume();
renderAcCards();
