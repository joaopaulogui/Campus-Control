import { useState, useMemo } from "react"
import { useQuery } from "@tanstack/react-query"
import { DataTable, type DataTableColumnDef } from "@/components/data-table"
import { audit } from "@/services/audit"
import type { Audit, EventEntity } from "@/types/audit"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { AuditEntitySelect } from "@/components/select/audit-entity-select"
import type { SelectOption } from "@/components/async-react-select"
import { formatDateTime } from "@/utils/date"
import {
  Boxes,
  DoorOpen,
  History,
  Search,
  UserCheck,
} from "lucide-react"
import IconContainer from "@/components/icon-container"

export default function AuditsPage() {
  // Filtros e pesquisa
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedEntity, setSelectedEntity] = useState<SelectOption<EventEntity> | null>(null)

  // Paginação
  const [page, setPage] = useState(1)
  const perPage = 10

  // Todos os audits para KPIs
  const { data: allAudits = [] } = useQuery({
    queryKey: ["audits", "all"],
    queryFn: () => audit.getList({ perPage: 200 }),
  })

  // Listagem paginada e filtrada
  const { data: audits = [], isLoading } = useQuery({
    queryKey: [
      "audits",
      page,
      perPage,
      searchTerm,
      selectedEntity?.value,
    ],
    queryFn: () =>
      audit.getList({
        page,
        perPage,
        description: searchTerm.trim() || undefined,
        eventEntity: selectedEntity?.value,
      }),
  })

  function handleSearchChange(value: string) {
    setSearchTerm(value)
    setPage(1)
  }

  function handleEntityChange(option: SelectOption<EventEntity> | null) {
    setSelectedEntity(option)
    setPage(1)
  }

  // KPIs
  const loanAndItemAuditsCount = useMemo(
    () => allAudits.filter((a) => a.eventEntity === "LOAN" || a.eventEntity === "ITEM").length,
    [allAudits]
  )
  const infraAuditsCount = useMemo(
    () =>
      allAudits.filter(
        (a) =>
          a.eventEntity === "ROOM" ||
          a.eventEntity === "BUILDING" ||
          a.eventEntity === "FLOOR" ||
          a.eventEntity === "AIR_CONDITIONER" ||
          a.eventEntity === "PROJECTOR"
      ).length,
    [allAudits]
  )

  // Retorna ícone correspondente à entidade do evento
  function getEntityIcon(entity: EventEntity) {
    switch (entity) {
      case "ITEM":
      case "LOAN":
        return <Boxes className="size-4" />
      case "ROOM":
      case "BUILDING":
      case "FLOOR":
        return <DoorOpen className="size-4" />
      case "USER":
        return <UserCheck className="size-4" />
      default:
        return <History className="size-4" />
    }
  }

  // Retorna label e variant do badge por entidade
  function getEntityBadge(entity: EventEntity) {
    switch (entity) {
      case "LOAN":
        return { label: "Empréstimo", variant: "info" as const }
      case "ITEM":
        return { label: "Item", variant: "success" as const }
      case "ROOM":
        return { label: "Sala", variant: "orange" as const }
      case "BUILDING":
        return { label: "Bloco", variant: "secondary" as const }
      case "FLOOR":
        return { label: "Andar", variant: "secondary" as const }
      case "USER":
        return { label: "Usuário", variant: "purple" as const }
      case "AIR_CONDITIONER":
        return { label: "Ar-Condicionado", variant: "info" as const }
      case "PROJECTOR":
        return { label: "Projetor", variant: "orange" as const }
      case "SCHEDULE":
        return { label: "Agendamento", variant: "warning" as const }
      default:
        return { label: entity, variant: "muted" as const }
    }
  }

  // Definição das colunas da tabela de Auditoria
  const columns = useMemo<DataTableColumnDef<Audit>[]>(
    () => [
      {
        accessorKey: "description",
        header: () => (
          <span className="text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
            Evento
          </span>
        ),
        cell: ({ row }) => {
          const a = row.original
          return (
            <div className="flex items-center gap-3">
              <IconContainer
                icon={getEntityIcon(a.eventEntity)}
                size="size-10"
              />
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-foreground">
                  {a.description}
                </span>
                <span className="text-xs text-muted-foreground font-mono">
                  ID: {a.entityId.slice(0, 8)}...
                </span>
              </div>
            </div>
          )
        },
      },
      {
        accessorKey: "eventEntity",
        header: () => (
          <span className="text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
            Recurso
          </span>
        ),
        cell: ({ row }) => {
          const { label, variant } = getEntityBadge(row.original.eventEntity)
          return (
            <Badge variant={variant} className="font-normal text-xs">
              {label}
            </Badge>
          )
        },
      },
      {
        accessorKey: "eventType",
        header: () => (
          <span className="text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
            Tipo de Ação
          </span>
        ),
        cell: ({ row }) => (
          <span className="text-xs font-mono font-medium text-foreground bg-muted/60 px-2 py-1 rounded-md">
            {row.original.eventType}
          </span>
        ),
      },
      {
        accessorKey: "createdAt",
        header: () => (
          <div className="text-right text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
            Data e Hora
          </div>
        ),
        cell: ({ row }) => (
          <div className="text-right">
            <span className="text-xs text-muted-foreground">
              {formatDateTime(row.original.createdAt)}
            </span>
          </div>
        ),
      },
    ],
    []
  )

  return (
    <div className="flex w-full flex-col gap-6">
      {/* Cabeçalho principal */}
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Auditoria
        </h1>
        <p className="text-sm text-muted-foreground">
          Histórico e rastreabilidade de eventos e ações do sistema
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card className="rounded-2xl border-border/80 shadow-xs">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex size-11 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
              <History className="size-5" />
            </div>
            <div>
              <p className="text-2xl font-bold tracking-tight text-foreground">
                {allAudits.length}
              </p>
              <p className="text-xs text-muted-foreground">Total de eventos</p>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-border/80 shadow-xs">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex size-11 items-center justify-center rounded-xl border border-blue-200/80 bg-blue-50 text-blue-600 dark:border-blue-900/50 dark:bg-blue-950/50 dark:text-blue-400">
              <Boxes className="size-5" />
            </div>
            <div>
              <p className="text-2xl font-bold tracking-tight text-foreground">
                {loanAndItemAuditsCount}
              </p>
              <p className="text-xs text-muted-foreground">Itens e empréstimos</p>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-border/80 shadow-xs">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex size-11 items-center justify-center rounded-xl border border-emerald-200/80 bg-emerald-50 text-emerald-600 dark:border-emerald-900/50 dark:bg-emerald-950/50 dark:text-emerald-400">
              <DoorOpen className="size-5" />
            </div>
            <div>
              <p className="text-2xl font-bold tracking-tight text-foreground">
                {infraAuditsCount}
              </p>
              <p className="text-xs text-muted-foreground">Infraestrutura</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Barra de Filtros e Pesquisa */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-3">
          <div className="w-56">
            <AuditEntitySelect
              value={selectedEntity}
              onChange={(option) => handleEntityChange(option as SelectOption<EventEntity> | null)}
            />
          </div>
        </div>

        <div className="relative w-full sm:w-80">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Pesquisar por descrição..."
            className="h-10 rounded-xl bg-input/40 pl-9"
          />
        </div>
      </div>

      {/* Tabela de Auditoria */}
      <DataTable
        columns={columns}
        data={audits}
        isLoading={isLoading}
        page={page}
        perPage={perPage}
        onPageChange={setPage}
      />
    </div>
  )
}
