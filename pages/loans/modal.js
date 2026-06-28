const modal = document.getElementById("loan-modal");

document.getElementById("new-loan-button").addEventListener("click", () => {
  modal.classList.remove("hidden");
});

document.getElementById("close-modal").addEventListener("click", () => {
  modal.classList.add("hidden");
});
