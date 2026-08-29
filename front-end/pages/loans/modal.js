const modal = document.getElementById("loan-modal");

document.getElementById("new-loan-button").addEventListener("click", () => {
  const itemSelect = document.getElementById("loan-item");
  itemSelect.innerHTML = EQUIPMENT_ITEMS.map(
    (item) => `<option value="${item}">${item}</option>`,
  ).join("");
  modal.classList.remove("hidden");
});

document.getElementById("close-modal").addEventListener("click", () => {
  modal.classList.add("hidden");
});
