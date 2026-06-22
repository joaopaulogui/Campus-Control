function getCardIconPaths(iconClass) {
    switch (iconClass) {
        case "active-loans":
            return `
                <path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z"></path>
                <path d="M12 22V12"></path>
                <polyline points="3.29 7 12 12 20.71 7"></polyline>
                <path d="m7.5 4.27 9 5.15"></path>
            `;
        case "late-returns":
        case "today-returns":
            return`
            <path d="M8 2v4"></path>
            <path d="M16 2v4"></path>
            <rect width="18" height="18" x="3" y="4" rx="2"></rect>
            <path d="M3 10h18"></path>
        `;
    }
}

function renderLoanCard(title, value, iconClass) {
    return `
        <div class="card" style="padding: 24px; flex: 1;">
            <div class="flex-row" style="justify-content: space-between;">
                <div>
                    <p class="light small-text smaller-bottom-margin">${title}</p>
                    <p class="bold ${iconClass} larger-text no-margin">${value}</p>
                </div>
                <div class="logo loan-logo">
                    <svg class="logo-vec loan-logo-vec ${iconClass}" viewBox="0 0 24 24">${getCardIconPaths(iconClass)}</svg>
                </div>
            </div>
        </div>
    `;
}

function getLoanStatus(status) {
    switch (status) {
        case "in-use":
            return "Em uso";
        case "late":
            return "Atrasado";
        case "returned":
            return "Devolvido";
    }
}

function renderLoansTableRow(loan) {
    return `
        <tr style="height: 89px;">
            <td class="table-td bold small-text">${loan.id}</td>
            <td class="table-td small-text">
                <div class="flex-row" style="gap: 8px; align-items: center;">
                    <div class="logo user-logo">
                        <svg class="logo-vec user-logo-vec" viewBox="0 0 24 24">
                            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                    </div>
                    <span class="small-text">${loan.responsible}</span>
                </div>
            </td>
            <td class="table-td small-text">${loan.registration}</td>
            <td class="table-td small-text">${loan.item}</td>
            <td class="table-td small-text">${loan.loanDate}</td>
            <td class="table-td small-text">${loan.returnDate}</td>
            <td class="table-td">
                <button class="base-button bold smaller-text ${loan.status}" style="padding: 4px 12px; white-space: nowrap;" data-toggle-status="${loan.id}">${getLoanStatus(loan.status)}</button>
            </td>
            <td class="table-td small-text">
                ${loan.status == "in-use" ? "-" : `
                    <button class="base-button bold small-text green-text register-return" style="padding: 4px 12px;" data-register-return="${loan.id}">Registrar<br>Devolução</button>
                `}
            </td>
        </tr>
    `;
}