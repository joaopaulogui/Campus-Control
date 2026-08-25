const loans = getLoans();
let search = "";

function getLoansStats(loans) {
  let activeLoans = 0;
  let lateReturns = 0;
  const todayReturns = 1;

  loans.forEach((loan) => {
    if (loan.status === "in-use") activeLoans++;
    else if (loan.status === "late") lateReturns++;
  });

  return { activeLoans, lateReturns, todayReturns };
}

function renderLoansResume() {
  const stats = getLoansStats(loans);
  const cardsHtml = [
    renderLoanCard("Empréstimos Ativos", stats.activeLoans, "active-loans"),
    renderLoanCard("Devoluções Atrasadas", stats.lateReturns, "late-returns"),
    renderLoanCard("Devoluções Hoje", stats.todayReturns, "today-returns"),
  ].join("");

  document.getElementById("loans-resume").innerHTML = `
    <div class="flex-row cards big-bottom-margin">${cardsHtml}</div>
  `;
}

function renderLoansTable() {
  const headers = [
    "Id",
    "Responsável",
    "Matrícula",
    "Item",
    "Data Empréstimo",
    "Data Devolução",
    "Status",
    "Actions",
  ];
  const loansThRowsHtml = headers
    .map(
      (header) => `<th class="table-th light bold smaller-text">${header}</th>`,
    )
    .join("");

  const filteredLoans = loans.filter(
    (loan) =>
      loan.item.toLowerCase().includes(search.toLowerCase()) ||
      loan.responsible.toLowerCase().includes(search.toLowerCase()),
  );
  const loansTableRowsHtml = filteredLoans
    .map((loan) => renderLoansTableRow(loan))
    .join("");

  document.getElementById("loans-table").innerHTML = `
    <div class="card">
      <div class="gray-border-bottom" style="padding: 24px;">
        <h3 class="bold big-text no-margin">Empréstimos Registrados</h3>
      </div>
      <table class="table">
        <thead class="table-thead"><tr>${loansThRowsHtml}</tr></thead>
        <tbody>${loansTableRowsHtml}</tbody>
      </table>
    </div>
  `;
}

document.getElementById("loans-table").addEventListener("click", (event) => {
  const statusButton = event.target.closest("[data-toggle-status]");
  if (statusButton) toggleStatus(statusButton.dataset.toggleStatus);

  const returnButton = event.target.closest("[data-register-return]");
  if (returnButton) registerReturn(returnButton.dataset.registerReturn);
});

document.getElementById("search-container").innerHTML = renderSearchField(
  "loans-search",
  "Buscar empréstimos por item...",
);
document
  .getElementById("search-container")
  .addEventListener("input", (event) => {
    if (event.target.id === "loans-search") {
      search = event.target.value;
      renderLoansTable();
    }
  });

document.getElementById("loan-form").addEventListener("submit", (event) => {
  event.preventDefault();

  const responsible = document.getElementById("loan-responsible").value.trim();
  const registration = document
    .getElementById("loan-registration")
    .value.trim();
  const item = document.getElementById("loan-item").value;
  const loanDate = document.getElementById("loan-loanDate").value;
  const returnDate = document.getElementById("loan-returnDate").value;

  if (returnDate < loanDate) {
    alert("A data de devolução deve ser depois da data de empréstimo.");
    return;
  }

  loans.push({
    id: "EMP" + (loans.length + 1).toString().padStart(3, "0"),
    responsible,
    registration,
    item,
    loanDate,
    returnDate,
    status: "in-use",
  });

  saveLoans(loans);
  renderLoansResume();
  renderLoansTable();
  document.getElementById("loan-modal").classList.add("hidden");
  event.target.reset();
});

renderLoansResume();
renderLoansTable();
