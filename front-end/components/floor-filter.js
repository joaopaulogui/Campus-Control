let filter = "all";
let onFilterChange;

function getFilteredFloors(allFloors, filter) {
  if (filter === "all") {
    return allFloors;
  }
  return [allFloors.find((floor) => floor.name === filter)];
}

function renderFloorFilter(allFloors) {
  const floorButtonsHtml = allFloors
    .map(
      (floor) => `
        <button class="floor-button bold text ${filter === floor.name ? "active-floor" : ""}" data-change-filter="${floor.name}">${floor.name}</button>
    `,
    )
    .join("");

  const html = `
        <div class="flex-row big-bottom-margin" style="gap: 12px;">
            <button class="floor-button bold text ${filter === "all" ? "active-floor" : ""}" data-change-filter="all">Todos os Andares</button>
            ${floorButtonsHtml}
        </div>
    `;
  document.getElementById("floor-filter").innerHTML = html;
}

function initFloorFilter(allFloors, onChange) {
  onFilterChange = onChange;
  renderFloorFilter(allFloors);

  document.getElementById("floor-filter").addEventListener("click", (event) => {
    const button = event.target.closest("[data-change-filter]");
    if (button) {
      filter = button.dataset.changeFilter;
      renderFloorFilter(allFloors);
      floors = getFilteredFloors(allFloors, button.dataset.changeFilter);
      onFilterChange();
    }
  });
}
