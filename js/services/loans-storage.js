const LOANS_KEY = "loans";

const defaultLoans = [
    { id: "EMP001", responsible: "Prof. Ricardo Mendes", registration: "FUNC-2045", item: "Projetor Epson EB-X41", loanDate: "02/05/2026", returnDate: "05/05/2026", status: "in-use" },
    { id: "EMP002", responsible: "Dra. Juliana Martins", registration: "FUNC-3012", item: "Notebook Dell Latitude", loanDate: "01/05/2026", returnDate: "04/05/2026", status: "late" },
    { id: "EMP003", responsible: "Prof. Carlos Alberto", registration: "FUNC-1987", item: "Caixa de Som JBL", loanDate: "30/04/2026", returnDate: "03/05/2026", status: "returned" },
    { id: "EMP004", responsible: "Téc. Amanda Silva", registration: "FUNC-4156", item: "Câmera Canon EOS", loanDate: "02/05/2026", returnDate: "06/05/2026", status: "in-use" },
    { id: "EMP005", responsible: "Prof. Fernando Costa", registration: "FUNC-2789", item: "Microfone Sem Fio Shure", loanDate: "28/04/2026", returnDate: "02/05/2026", status: "returned" },
];

function getLoans() {
    const saved = localStorage.getItem(LOANS_KEY)
    if (saved) {
        return JSON.parse(saved)
    }
    return defaultLoans
}

function saveLoans(loans) {
    localStorage.setItem(LOANS_KEY, JSON.stringify(loans))
}

