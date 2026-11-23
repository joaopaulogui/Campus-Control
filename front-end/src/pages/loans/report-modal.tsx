import { useState, useMemo } from "react"
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { formatDate } from "@/utils/date"
import type { Loan } from "@/types/loan"
import { ChevronLeft, Download, FileSpreadsheet, FileText, Loader2, X } from "lucide-react"

type Props = {
  open: boolean
  setOpen: (open: boolean) => void
  allLoans: Loan[]
}

type Step = "CONFIG" | "LOADING" | "PREVIEW"

export function ReportModal({ open, setOpen, allLoans }: Props) {
  const today = new Date().toISOString().split("T")[0]
  const firstDayOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1)
    .toISOString()
    .split("T")[0]

  const [step, setStep] = useState<Step>("CONFIG")
  const [startDate, setStartDate] = useState(firstDayOfMonth)
  const [endDate, setEndDate] = useState(today)

  const filteredLoans = useMemo(() => {
    if (!startDate && !endDate) return allLoans

    const start = startDate ? new Date(`${startDate}T00:00:00`).getTime() : 0
    const end = endDate ? new Date(`${endDate}T23:59:59`).getTime() : Infinity

    return allLoans.filter((l) => {
      const loanTime = new Date(l.createdAt).getTime()
      return loanTime >= start && loanTime <= end
    })
  }, [allLoans, startDate, endDate])

  const stats = useMemo(() => {
    const active = filteredLoans.filter((l) => l.status === "IN_USE").length
    const late = filteredLoans.filter((l) => l.status === "LATE").length
    const returned = filteredLoans.filter((l) => l.status === "RETURNED").length
    return { active, late, returned }
  }, [filteredLoans])

  function handleStartGenerate() {
    setStep("LOADING")
    setTimeout(() => {
      setStep("PREVIEW")
    }, 600)
  }

  function handleClose() {
    setOpen(false)
    setTimeout(() => setStep("CONFIG"), 200)
  }

  function handleExportCSV() {
    const headers = [
      "ID",
      "Responsavel",
      "Matricula",
      "Item",
      "Data Emprestimo",
      "Devolucao Prevista",
      "Data Devolucao",
      "Status",
    ]

    const rows = filteredLoans.map((l) => [
      `EMP-${l.id.slice(0, 4).toUpperCase()}`,
      `"${l.responsibleName.replace(/"/g, '""')}"`,
      `"${l.responsibleRegistration}"`,
      `"${l.itemName.replace(/"/g, '""')}"`,
      formatDate(l.createdAt),
      formatDate(l.deadline),
      formatDate(l.returnedAt),
      l.status === "IN_USE"
        ? "Ativo"
        : l.status === "LATE"
        ? "Em atraso"
        : "Devolvido",
    ])

    const csvContent =
      "\uFEFF" + [headers.join(";"), ...rows.map((e) => e.join(";"))].join("\n")
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute(
      "download",
      `relatorio-emprestimos-${startDate}-a-${endDate}.csv`
    )
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  function handleExportPDF() {
    window.print()
  }

  return (
    <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Backdrop className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs transition-opacity duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0" />
        <DialogPrimitive.Popup
          className={
            step === "PREVIEW"
              ? "fixed top-1/2 left-1/2 z-50 w-[95vw] max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-card p-6 shadow-2xl border border-border/70 transition duration-150"
              : "fixed top-1/2 left-1/2 z-50 w-[95vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-card p-6 shadow-2xl border border-border/70 transition duration-150"
          }
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-4 mb-5">
            <div className="space-y-1">
              <h2 className="text-base font-bold text-foreground tracking-tight">
                {step === "CONFIG" && "Gerar relatório de empréstimos"}
                {step === "LOADING" && "Gerando relatório..."}
                {step === "PREVIEW" && "Relatório de empréstimos"}
              </h2>
              <p className="text-xs text-muted-foreground">
                {step === "CONFIG" && "Selecione o período para o relatório"}
                {step === "LOADING" &&
                  `Consultando empréstimos de ${formatDate(startDate)} a ${formatDate(endDate)}`}
                {step === "PREVIEW" &&
                  `Período: ${formatDate(startDate)} – ${formatDate(endDate)} • ${filteredLoans.length} registros`}
              </p>
            </div>
            {step !== "LOADING" && (
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={handleClose}
                className="size-7 rounded-lg text-muted-foreground hover:text-foreground"
              >
                <X className="size-4" />
              </Button>
            )}
          </div>

          {/* Body */}
          {step === "CONFIG" && (
            <div className="flex flex-col gap-4 text-left">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <Label
                    htmlFor="report-start"
                    className="text-xs font-medium text-foreground"
                  >
                    Data inicial
                  </Label>
                  <Input
                    id="report-start"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="h-10 rounded-xl bg-input/40"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label
                    htmlFor="report-end"
                    className="text-xs font-medium text-foreground"
                  >
                    Data final
                  </Label>
                  <Input
                    id="report-end"
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="h-10 rounded-xl bg-input/40"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClose}
                  className="flex-1 rounded-xl h-10 border-border/80 hover:bg-muted text-sm font-medium"
                >
                  Cancelar
                </Button>
                <Button
                  type="button"
                  onClick={handleStartGenerate}
                  className="flex-1 rounded-xl h-10 bg-primary text-primary-foreground hover:bg-primary/90 text-sm font-medium shadow-sm flex items-center justify-center gap-2"
                >
                  <FileText className="size-4" />
                  Gerar relatório
                </Button>
              </div>
            </div>
          )}

          {step === "LOADING" && (
            <div className="flex flex-col items-center justify-center py-10 gap-3">
              <Loader2 className="size-8 animate-spin text-primary" />
              <p className="text-xs text-muted-foreground">
                Processando informações...
              </p>
            </div>
          )}

          {step === "PREVIEW" && (
            <div className="flex flex-col gap-4">
              {/* Mini KPI Cards */}
              <div className="grid grid-cols-3 gap-3">
                <div className="flex flex-col items-center justify-center rounded-xl border border-emerald-200/80 bg-emerald-50/50 p-3 dark:border-emerald-900/50 dark:bg-emerald-950/20">
                  <span className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
                    {stats.active}
                  </span>
                  <span className="text-xs font-medium text-emerald-700/80 dark:text-emerald-400/80">
                    Ativos
                  </span>
                </div>

                <div className="flex flex-col items-center justify-center rounded-xl border border-red-200/80 bg-red-50/50 p-3 dark:border-red-900/50 dark:bg-red-950/20">
                  <span className="text-xl font-bold text-red-600 dark:text-red-400">
                    {stats.late}
                  </span>
                  <span className="text-xs font-medium text-red-700/80 dark:text-red-400/80">
                    Atrasados
                  </span>
                </div>

                <div className="flex flex-col items-center justify-center rounded-xl border border-blue-200/80 bg-blue-50/50 p-3 dark:border-blue-900/50 dark:bg-blue-950/20">
                  <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
                    {stats.returned}
                  </span>
                  <span className="text-xs font-medium text-blue-700/80 dark:text-blue-400/80">
                    Devolvidos
                  </span>
                </div>
              </div>

              {/* Table List */}
              <div className="max-h-64 overflow-y-auto rounded-xl border border-border/80">
                <table className="w-full text-left text-xs">
                  <thead className="sticky top-0 bg-muted/60 backdrop-blur-xs text-muted-foreground">
                    <tr>
                      <th className="py-2.5 px-3 font-semibold uppercase text-[10px]">
                        ID
                      </th>
                      <th className="py-2.5 px-3 font-semibold uppercase text-[10px]">
                        Responsável
                      </th>
                      <th className="py-2.5 px-3 font-semibold uppercase text-[10px]">
                        Item
                      </th>
                      <th className="py-2.5 px-3 font-semibold uppercase text-[10px]">
                        Empréstimo
                      </th>
                      <th className="py-2.5 px-3 font-semibold uppercase text-[10px]">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/60">
                    {filteredLoans.length === 0 ? (
                      <tr>
                        <td
                          colSpan={5}
                          className="py-6 text-center text-muted-foreground"
                        >
                          Nenhum registro encontrado no período selecionado.
                        </td>
                      </tr>
                    ) : (
                      filteredLoans.map((l) => (
                        <tr key={l.id} className="hover:bg-muted/30">
                          <td className="py-2.5 px-3 font-medium text-muted-foreground">
                            EMP-{l.id.slice(0, 4).toUpperCase()}
                          </td>
                          <td className="py-2.5 px-3 font-medium text-foreground">
                            {l.responsibleName}
                          </td>
                          <td className="py-2.5 px-3 text-foreground">
                            {l.itemName}
                          </td>
                          <td className="py-2.5 px-3 text-muted-foreground">
                            {formatDate(l.createdAt)}
                          </td>
                          <td className="py-2.5 px-3">
                            {l.status === "IN_USE" && (
                              <Badge
                                variant="success"
                                className="gap-1 font-normal text-[10px]"
                              >
                                <span className="size-1 rounded-full bg-emerald-500" />
                                Ativo
                              </Badge>
                            )}
                            {l.status === "LATE" && (
                              <Badge
                                variant="destructive"
                                className="gap-1 font-normal text-[10px]"
                              >
                                <span className="size-1 rounded-full bg-red-500" />
                                Atrasado
                              </Badge>
                            )}
                            {l.status === "RETURNED" && (
                              <Badge
                                variant="info"
                                className="gap-1 font-normal text-[10px]"
                              >
                                <span className="size-1 rounded-full bg-blue-500" />
                                Devolvido
                              </Badge>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep("CONFIG")}
                  className="rounded-xl h-10 border-border/80 hover:bg-muted text-xs font-medium flex items-center gap-1.5"
                >
                  <ChevronLeft className="size-4" />
                  Voltar
                </Button>
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    onClick={handleExportPDF}
                    className="rounded-xl h-10 bg-primary text-primary-foreground hover:bg-primary/90 text-xs font-medium shadow-sm flex items-center gap-1.5"
                  >
                    <Download className="size-4" />
                    Exportar PDF
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleExportCSV}
                    className="rounded-xl h-10 border-border/80 hover:bg-muted text-xs font-medium flex items-center gap-1.5"
                  >
                    <FileSpreadsheet className="size-4" />
                    Exportar CSV
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogPrimitive.Popup>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}
