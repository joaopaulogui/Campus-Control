import { useState, useMemo } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { DataTable, type DataTableColumnDef } from "@/components/data-table"
import { CanAccess } from "@/components/can-access"
import { ActionAlertDialog } from "@/components/action-alert-dialog"
import { ModalForm } from "@/components/modal-form"
import LoanForm from "./form"
import { ReportModal } from "./report-modal"
import { loan } from "@/services/loan"
import type { Loan, LoanType } from "@/types/loan"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { LoanStatusSelect } from "@/components/select/loan-status-select"
import type { SelectOption } from "@/components/async-react-select"
import { formatDate } from "@/utils/date"
import { toast } from "react-toastify"
import {
  Check,
  CheckCircle2,
  Clock,
  FileText,
  Plus,
  Search,
} from "lucide-react"

import { invalidateLoanRelatedQueries } from "@/config/query-keys"

export default function LoansPage() {
  const queryClient = useQueryClient()

  // Filtros e pesquisa
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState<SelectOption<LoanType> | null>(null)

  // Paginação
  const [page, setPage] = useState(1)
  const perPage = 9

  // Modais de ação
  const [openModalCreate, setOpenModalCreate] = useState(false)
  const [openReportModal, setOpenReportModal] = useState(false)
  const [openAlertReturn, setOpenAlertReturn] = useState(false)
  const [loanToReturn, setLoanToReturn] = useState<Loan | null>(null)

  // Todos os empréstimos para KPIs e Relatório
  const { data: allLoans = [] } = useQuery({
    queryKey: ["loans", "all"],
    queryFn: () => loan.getList({ perPage: 200 }),
  })

  // Listagem paginada e filtrada
  const { data: loans = [], isLoading } = useQuery({
    queryKey: [
      "loans",
      page,
      perPage,
      searchTerm,
      selectedStatus?.value,
    ],
    queryFn: () =>
      loan.getList({
        page,
        perPage,
        responsibleName: searchTerm.trim() || undefined,
        status: selectedStatus?.value,
      }),
  })

  function handleSearchChange(value: string) {
    setSearchTerm(value)
    setPage(1)
  }

  function handleStatusChange(option: SelectOption<LoanType> | null) {
    setSelectedStatus(option)
    setPage(1)
  }

  // KPIs
  const activeCount = useMemo(
    () => allLoans.filter((l) => l.status === "IN_USE").length,
    [allLoans]
  )
  const lateCount = useMemo(
    () => allLoans.filter((l) => l.status === "LATE").length,
    [allLoans]
  )
  const returnedCount = useMemo(
    () => allLoans.filter((l) => l.status === "RETURNED").length,
    [allLoans]
  )

  // Mutação para devolução de empréstimo
  const mutationReturn = useMutation({
    mutationFn: (id: string) => loan.return(id),
    onMutate() {
      toast.loading("Registrando devolução...", { toastId: "return_loan" })
    },
    onSuccess() {
      toast.update("return_loan", {
        render: "Devolução registrada com sucesso",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      })
      setOpenAlertReturn(false)
      setLoanToReturn(null)
      invalidateLoanRelatedQueries(queryClient)
    },
    onError(err: unknown) {
      const errorObj = err as { response?: { data?: { message?: string } } }
      toast.update("return_loan", {
        render: errorObj.response?.data?.message ?? "Erro ao registrar devolução",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      })
    },
  })

  function handleOpenReturn(targetLoan: Loan) {
    setLoanToReturn(targetLoan)
    setOpenAlertReturn(true)
  }

  function confirmReturn() {
    if (!loanToReturn) return
    mutationReturn.mutate(loanToReturn.id)
  }

  const todayFormatted = formatDate(new Date())

  // Definição das colunas da tabela de Empréstimos
  const columns = useMemo<DataTableColumnDef<Loan>[]>(
    () => [
      {
        accessorKey: "id",
        header: () => (
          <span className="text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
            ID
          </span>
        ),
        cell: ({ row }) => (
          <span className="text-xs font-medium text-muted-foreground">
            EMP-{row.original.id.slice(0, 4).toUpperCase()}
          </span>
        ),
      },
      {
        accessorKey: "responsibleName",
        header: () => (
          <span className="text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
            Responsável
          </span>
        ),
        cell: ({ row }) => (
          <div className="flex flex-col">
            <span className="text-sm font-medium text-foreground">
              {row.original.responsibleName}
            </span>
            <span className="text-xs text-muted-foreground">
              Mat. {row.original.responsibleRegistration}
            </span>
          </div>
        ),
      },
      {
        accessorKey: "itemName",
        header: () => (
          <span className="text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
            Item
          </span>
        ),
        cell: ({ row }) => (
          <span className="text-sm text-foreground">
            {row.original.itemName}
          </span>
        ),
      },
      {
        accessorKey: "createdAt",
        header: () => (
          <span className="text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
            Empréstimo
          </span>
        ),
        cell: ({ row }) => (
          <span className="text-xs text-muted-foreground">
            {formatDate(row.original.createdAt)}
          </span>
        ),
      },
      {
        accessorKey: "deadline",
        header: () => (
          <span className="text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
            Dev. Prev.
          </span>
        ),
        cell: ({ row }) => {
          const isLate = row.original.status === "LATE"
          return (
            <span
              className={
                isLate
                  ? "text-xs font-semibold text-red-600 dark:text-red-400"
                  : "text-xs text-muted-foreground"
              }
            >
              {formatDate(row.original.deadline)}
            </span>
          )
        },
      },
      {
        accessorKey: "status",
        header: () => (
          <span className="text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
            Status
          </span>
        ),
        cell: ({ row }) => {
          const status = row.original.status
          if (status === "IN_USE") {
            return (
              <Badge variant="success" className="gap-1.5 font-normal">
                <span className="size-1.5 rounded-full bg-emerald-500" />
                Ativo
              </Badge>
            )
          }
          if (status === "LATE") {
            return (
              <Badge variant="destructive" className="gap-1.5 font-normal">
                <span className="size-1.5 rounded-full bg-red-500" />
                Atrasado
              </Badge>
            )
          }
          return (
            <Badge variant="info" className="gap-1.5 font-normal">
              <span className="size-1.5 rounded-full bg-blue-500" />
              Devolvido
            </Badge>
          )
        },
      },
      {
        id: "actions",
        header: () => (
          <div className="text-right text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
            Ação
          </div>
        ),
        cell: ({ row }) => {
          const targetLoan = row.original
          if (targetLoan.status === "RETURNED") {
            return (
              <div className="flex items-center justify-end">
                <span className="text-xs text-muted-foreground">
                  {formatDate(targetLoan.returnedAt)}
                </span>
              </div>
            )
          }

          return (
            <div className="flex items-center justify-end">
              <CanAccess allowedRoles={["ADMIN", "MEMBER"]}>
                <Button
                  size="sm"
                  onClick={() => handleOpenReturn(targetLoan)}
                  className="h-8 rounded-lg bg-primary px-3 text-xs font-medium text-white shadow-xs hover:bg-primary/90"
                >
                  Devolver
                </Button>
              </CanAccess>
            </div>
          )
        },
      },
    ],
    []
  )

  return (
    <div className="flex w-full flex-col gap-6">
      {/* Diálogo de confirmação para registro de devolução */}
      <ActionAlertDialog
        open={openAlertReturn}
        setOpen={setOpenAlertReturn}
        variant="success"
        title="Registrar devolução"
        subtitle={`Confirmar devolução de ${loanToReturn?.itemName ?? "item"} por ${loanToReturn?.responsibleName ?? "responsável"}? A data de hoje (${todayFormatted}) será registrada.`}
        textActionButton="Confirmar"
        action={confirmReturn}
      />

      {/* Modal centralizado para novo empréstimo */}
      <ModalForm
        open={openModalCreate}
        setOpen={setOpenModalCreate}
        title="Novo empréstimo"
        subtitle="Preencha os dados do empréstimo"
      >
        <LoanForm back={() => setOpenModalCreate(false)} />
      </ModalForm>

      {/* Modal de geração de relatório */}
      <ReportModal
        open={openReportModal}
        setOpen={setOpenReportModal}
        allLoans={allLoans}
      />

      {/* Cabeçalho principal */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Empréstimos
          </h1>
          <p className="text-sm text-muted-foreground">
            Gerencie empréstimos de equipamentos do campus
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => setOpenReportModal(true)}
            className="flex items-center gap-2 rounded-xl border-border/80 px-4 py-2 text-sm font-semibold text-foreground hover:bg-muted"
          >
            <FileText className="size-4" />
            Gerar relatório
          </Button>

          <CanAccess allowedRoles={["ADMIN", "MEMBER"]}>
            <Button
              onClick={() => setOpenModalCreate(true)}
              className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90"
            >
              <Plus className="size-4" />
              Novo empréstimo
            </Button>
          </CanAccess>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card className="rounded-2xl border-border/80 shadow-xs">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex size-11 items-center justify-center rounded-xl border border-emerald-200/80 bg-emerald-50 text-emerald-600 dark:border-emerald-900/50 dark:bg-emerald-950/50 dark:text-emerald-400">
              <Check className="size-5" />
            </div>
            <div>
              <p className="text-2xl font-bold tracking-tight text-foreground">
                {activeCount}
              </p>
              <p className="text-xs text-muted-foreground">
                Empréstimos ativos
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-border/80 shadow-xs">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex size-11 items-center justify-center rounded-xl border border-red-200/80 bg-red-50 text-red-600 dark:border-red-900/50 dark:bg-red-950/50 dark:text-red-400">
              <Clock className="size-5" />
            </div>
            <div>
              <p className="text-2xl font-bold tracking-tight text-foreground">
                {lateCount}
              </p>
              <p className="text-xs text-muted-foreground">
                Em atraso
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-border/80 shadow-xs">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex size-11 items-center justify-center rounded-xl border border-blue-200/80 bg-blue-50 text-blue-600 dark:border-blue-900/50 dark:bg-blue-950/50 dark:text-blue-400">
              <CheckCircle2 className="size-5" />
            </div>
            <div>
              <p className="text-2xl font-bold tracking-tight text-foreground">
                {returnedCount}
              </p>
              <p className="text-xs text-muted-foreground">
                Devolvidos
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Barra de Filtros e Pesquisa */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-3">
          <div className="w-full sm:w-52">
            <LoanStatusSelect
              value={selectedStatus}
              onChange={(option) => handleStatusChange(option as SelectOption<LoanType> | null)}
            />
          </div>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Pesquisar por responsável..."
            className="h-10 rounded-xl bg-input/40 pl-9"
          />
        </div>
      </div>

      {/* Tabela de Empréstimos */}
      <DataTable
        columns={columns}
        data={loans}
        isLoading={isLoading}
        page={page}
        perPage={perPage}
        onPageChange={setPage}
      />
    </div>
  )
}
