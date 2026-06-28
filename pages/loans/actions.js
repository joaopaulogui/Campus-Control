function toggleStatus(loanId) {
    const loan = loans.find(item => item.id === loanId)

    if (loan) {
        switch (loan.status) {
            case "in-use":
                loan.status = "late";
                break;
            case "late":
                loan.status = "returned";
                break;
            case "returned":
                loan.status = "in-use"
                break;
        }
    }


    saveLoans(loans);
    renderLoansResume();
    renderLoansTable();
}

function registerReturn(loanId) {
    const loan = loans.find(item => item.id === loanId)

    if (loan && loan.status !== "returned") { loan.status = "returned"; }

    saveLoans(loans);
    renderLoansResume();
    renderLoansTable();
}