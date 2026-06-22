const loans = getLoans();
let search = "";

function getLoansStats(loans) {
    var activeLoans = 0;
    var lateReturns = 0;
    var todayReturns = 1;
    
    loans.forEach(loan => {
        if (loan.status == "in-use") { activeLoans++; }
        else if (loan.status == "late") { lateReturns++; }
    });

    return {
        activeLoans,
        lateReturns,
        todayReturns,
    };
}

function renderLoansResume() {
    const stats = getLoansStats(loans);

    const cardsHtml = [
        renderLoanCard("Empréstimos Ativos", stats.activeLoans, "active-loans"),
        renderLoanCard("Devoluções Atrasadas", stats.lateReturns, "late-returns"),
        renderLoanCard("Devoluções Hoje", stats.todayReturns, "today-returns"),
    ].join('');

    const html = `
        <div class="flex-row cards big-bottom-margin">
            ${cardsHtml}
        </div>
    `;

    document.getElementById('loans-resume').innerHTML = html;
}

function renderLoansTable() {
    const headers = [ "Id", "Responsável", "Matrícula", "Item", "Data Empréstimo", "Data Devolução", "Status", "Actions" ];
    
    const loansThRowsHtml = headers.map(header => `<th class="table-th light bold smaller-text">${header}</th>`).join('');
    const loansTableRowsHtml = loans.map(loan => loan.item.toLowerCase().includes(search.toLowerCase()) || loan.responsible.toLowerCase().includes(search.toLowerCase()) ? renderLoansTableRow(loan) : '').join('');

    const html = `
        <div class="card">
            <div class="gray-border-bottom" style="padding: 24px;">
                <h3 class="bold big-text no-margin">Empréstimos Registrados</h3>
            </div>
            <table class="table">
                <thead class="table-thead">
                    <tr>
                        ${loansThRowsHtml}
                    </tr>
                </thead>
                <tbody>
                    ${loansTableRowsHtml}
                </tbody>
            </table>
        </div>
    `;
    
    document.getElementById('loans-table').innerHTML = html;
}

document.getElementById('loans-table').addEventListener('click', (event) => {
    const button = event.target.closest('[data-toggle-status]');
    if (button) {
        toggleStatus(button.dataset.toggleStatus);
    }
});

document.getElementById('loans-table').addEventListener('click', (event) => {
    const button = event.target.closest('[data-register-return]');
    if (button) {
        registerReturn(button.dataset.registerReturn);
    }
});

document.getElementById('search-header').addEventListener('input', (event) => {
    search = event.target.value;
    renderLoansTable();
});

renderLoansResume();
renderLoansTable();