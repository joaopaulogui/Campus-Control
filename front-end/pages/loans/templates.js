function getCardIconPaths(iconClass) {
    switch (iconClass) {
        case "active-loans":
            return getIcon("box"); 
        case "late-returns":
        case "today-returns":
            return getIcon("calendar"); 
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
        <tr class="gray-border-bottom" style="height: 89px;">
            <td class="table-td bold small-text">${loan.id}</td>
            <td class="table-td small-text">
                <div class="flex-row" style="gap: 8px; align-items: center;">
                    <div class="logo user-logo">
                        <svg class="logo-vec user-logo-vec" viewBox="0 0 24 24">
                            ${getIcon("user")}
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
                ${loan.status == "returned" ? "-" : `
                    <button class="base-button bold small-text green-text register-return" style="padding: 4px 12px;" data-register-return="${loan.id}">Registrar<br>Devolução</button>
                `}
            </td>
        </tr>
    `;
}