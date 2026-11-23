export function formatHeaderDate(date: Date): string {
    const formatted = new Intl.DateTimeFormat("pt-BR", {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric",
    }).format(date)

    return formatted
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
}

export function formatActivityDate(isoDate: string): string {
    const date = new Date(isoDate)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return "Hoje"
    if (diffDays === 1) return "Ontem"
    if (diffDays > 1 && diffDays <= 6) return `Há ${diffDays} dias`

    return new Intl.DateTimeFormat("pt-BR", {
        day: "2-digit",
        month: "2-digit",
    }).format(date)
}

export function formatDate(isoDate: string | Date | null | undefined): string {
    if (!isoDate) return "-"
    const date = typeof isoDate === "string" ? new Date(isoDate) : isoDate
    if (isNaN(date.getTime())) return "-"

    return new Intl.DateTimeFormat("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    }).format(date)
}

export function formatDateTime(isoDate: string | Date | null | undefined): string {
    if (!isoDate) return "-"
    const date = typeof isoDate === "string" ? new Date(isoDate) : isoDate
    if (isNaN(date.getTime())) return "-"

    return new Intl.DateTimeFormat("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    }).format(date)
}

