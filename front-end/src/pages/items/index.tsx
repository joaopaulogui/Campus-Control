import { useState, useMemo } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { DataTable, type DataTableColumnDef } from "@/components/data-table"
import { CanAccess } from "@/components/can-access"
import { ActionAlertDialog } from "@/components/action-alert-dialog"
import { ModalForm } from "@/components/modal-form"
import ItemForm from "./form"
import { item } from "@/services/item"
import type { Item, ItemType } from "@/types/item"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from "react-toastify"
import {
  Boxes,
  Clock,
  MoreHorizontal,
  Package,
  PackageCheck,
  Plus,
  Search,
  Trash2,
} from "lucide-react"
import IconContainer from "@/components/icon-container"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ItemTypeSelect } from "@/components/select/item-type-select"
import type { SelectOption } from "@/components/async-react-select"
import { cn } from "cn"
import { invalidateItemRelatedQueries } from "@/config/query-keys"

export default function ItemsPage() {
  const queryClient = useQueryClient()

  // Filtros e pesquisa
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedItemStatus, setSelectedItemStatus] = useState<SelectOption<ItemType> | null>(null)

  // Paginação
  const [page, setPage] = useState(1)
  const perPage = 9

  // Modais de ação
  const [openModalForm, setOpenModalForm] = useState(false)
  const [itemToEdit, setItemToEdit] = useState<Item | null>(null)
  const [openAlertDeleteItem, setOpenAlertDeleteItem] = useState(false)
  const [itemToDelete, setItemToDelete] = useState<Item | null>(null)

  // Todos os itens para os cards de KPIs
  const { data: allItems = [] } = useQuery({
    queryKey: ["items", "all"],
    queryFn: () => item.getList({ perPage: 200 }),
  })

  // Listagem paginada e filtrada
  const { data: items = [], isLoading } = useQuery({
    queryKey: [
      "items",
      page,
      perPage,
      searchTerm,
      selectedItemStatus
    ],
    queryFn: () =>
      item.getList({
        page,
        perPage,
        name: searchTerm.trim() || undefined,
        type: selectedItemStatus?.value ? selectedItemStatus?.value : undefined
      }),
  })

  function handleSearchChange(value: string) {
    setSearchTerm(value)
    setPage(1)
  }

  function handleStatusChange(option: SelectOption<ItemType> | null) {
    setSelectedItemStatus(option)
    setPage(1)
  }

  // KPIs
  const totalItemsCount = allItems.length
  const totalUnitsCount = useMemo(
    () => allItems.reduce((acc, it) => acc + (it.totalQuantity || 0), 0),
    [allItems]
  )
  const availableUnitsCount = useMemo(
    () => allItems.reduce((acc, it) => acc + (it.availableQuantity || 0), 0),
    [allItems]
  )
  const inUseUnitsCount = useMemo(
    () =>
      allItems.reduce(
        (acc, it) =>
          acc +
          (it.onHoldQuantity ?? Math.max(0, it.totalQuantity - it.availableQuantity)),
        0
      ),
    [allItems]
  )

  // Mutação de exclusão de item
  const mutationDeleteItem = useMutation({
    mutationFn: (id: string) => item.delete(id),
    onMutate() {
      toast.loading("Excluindo item...", { toastId: "delete_item" })
    },
    onSuccess() {
      toast.update("delete_item", {
        render: "Item excluído com sucesso",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      })
      setOpenAlertDeleteItem(false)
      setItemToDelete(null)
      invalidateItemRelatedQueries(queryClient)
    },
    onError(error: unknown) {
      const err = error as { response?: { data?: { message?: string } } }
      toast.update("delete_item", {
        render: err.response?.data?.message ?? "Erro ao excluir item",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      })
    },
  })

  function handleOpenCreate() {
    setItemToEdit(null)
    setOpenModalForm(true)
  }

  function handleDeleteItem(targetItem: Item) {
    setItemToDelete(targetItem)
    setOpenAlertDeleteItem(true)
  }

  function confirmDeleteItem() {
    if (itemToDelete) {
      mutationDeleteItem.mutate(itemToDelete.id)
    }
  }

  // Definição das colunas da tabela
  const columns = useMemo<DataTableColumnDef<Item>[]>(
    () => [
      {
        id: "name",
        header: "ITEM",
        cell: ({ row }) => {
          const item = row.original

          return (
            <div className="flex items-center gap-3">
              <IconContainer
                icon={<Package className="size-4" />}
                size="size-10"
              />

              <span className="flex items-center text-sm font-semibold text-foreground">
                {item.name}
              </span>
            </div>
          )
        },
      },
      {
        id: "type",
        header: "CATEGORIA",
        cell: ({ row }) => {
          const type = row.original.type

          return (
            <Badge variant={type === "EQUIPMENT" ? "info" : type === "STATIONARY" ? "orange" : "purple"}>
              {type === "EQUIPMENT" ? "Equipamento" : type === "STATIONARY" ? "Fixo" : "Outro"}
            </Badge>
          )
        },
      },
      {
        id: "availableQuantity",
        header: "QUANTIDADE EMPRÉSTADA",
        cell: ({ row }) => {
          const total = row.original.totalQuantity
          const onHold = total - row.original.availableQuantity
          const onPct = total > 0 ? (onHold / total) * 100 : 0
          return (
            <div className="flex flex-col gap-2">
              <div className="flex gap-1 items-center">
                <p className="font-semibold text-foreground">{onHold}</p>
                <p className="text-xs text-muted-foreground">/ {total}</p>
              </div>
              <div className="h-1.5 w-32 overflow-hidden rounded-full bg-muted border border-border/60">
                <div
                  style={{ width: `${onPct}%` }}
                  className="h-full rounded-full bg-emerald-500 transition-all"
                />
              </div>
            </div>
          )
        },
      },
      {
        id: "status",
        header: "STATUS",
        cell: ({ row }) => {
          const isAvailable = row.original.availableQuantity > 0

          return (
            <Badge
              variant={isAvailable ? "success" : "destructive"}
              className="gap-1.5 font-normal"
            >
              <span
                className={cn(
                  "size-1.5 rounded-full",
                  isAvailable ? "bg-emerald-500" : "bg-red-500"
                )}
              />
              {isAvailable ? "Disponível" : "Indisponível"}
            </Badge>
          )
        },
      },
      {
        id: "actions",
        header: () => <div className="text-right">AÇÃO</div>,
        cell: ({ row }) => {
          const targetItem = row.original
          return (
            <div className="flex items-center justify-end gap-2">
              {/* Botão de ações restrito a Administradores */}
              <CanAccess allowedRoles={["ADMIN"]}>
                <DropdownMenu>
                  <DropdownMenuTrigger className="size-8 rounded-lg text-muted-foreground hover:text-foreground">
                    <MoreHorizontal className="size-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-36">
                    <DropdownMenuItem
                      variant="destructive"
                      onClick={() => handleDeleteItem(targetItem)}
                    >
                      <Trash2 className="size-4 text-destructive" />
                      Excluir
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CanAccess>
            </div>
          )
        },
      },
    ], [])

  return (
    <div className="flex w-full flex-col gap-6">
      {/* Diálogo de confirmação para exclusão de item*/}
      <ActionAlertDialog
        open={openAlertDeleteItem}
        setOpen={setOpenAlertDeleteItem}
        title="Excluir item"
        subtitle={`Tem certeza que deseja excluir ${itemToDelete?.name ?? "este item"}? Esta ação não pode ser desfeita.`}
        textActionButton="Confirmar"
        action={confirmDeleteItem}
      />

      {/* Modal centralizado para criação / edição de item */}
      <ModalForm
        open={openModalForm}
        setOpen={setOpenModalForm}
        title={itemToEdit ? "Editar item" : "Adicionar item"}
        subtitle="Preencha os dados do item"
      >
        <ItemForm
          key={itemToEdit?.id ?? "new-item"}
          back={() => setOpenModalForm(false)}
        />
      </ModalForm>

      {/* Cabeçalho principal */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Itens
          </h1>
          <p className="text-sm text-muted-foreground">
            Catálogo de equipamentos para empréstimo
          </p>
        </div>

        <CanAccess allowedRoles={["ADMIN"]}>
          <Button
            onClick={handleOpenCreate}
            className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90"
          >
            <Plus className="size-4" />
            Adicionar item
          </Button>
        </CanAccess>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card className="rounded-2xl border-border/80 shadow-xs">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex size-11 items-center justify-center rounded-xl border border-blue-200/80 bg-blue-50 text-blue-600 dark:border-blue-900/50 dark:bg-blue-950/50 dark:text-blue-400">
              <Package className="size-5" />
            </div>
            <div>
              <p className="text-2xl font-bold tracking-tight text-foreground">
                {totalItemsCount}
              </p>
              <p className="text-xs text-muted-foreground">Total de itens</p>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-border/80 shadow-xs">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex size-11 items-center justify-center rounded-xl border border-border/80 bg-muted/60 text-muted-foreground">
              <Boxes className="size-5" />
            </div>
            <div>
              <p className="text-2xl font-bold tracking-tight text-foreground">
                {totalUnitsCount}
              </p>
              <p className="text-xs text-muted-foreground">Unidades totais</p>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-border/80 shadow-xs">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex size-11 items-center justify-center rounded-xl border border-emerald-200/80 bg-emerald-50 text-emerald-600 dark:border-emerald-900/50 dark:bg-emerald-950/50 dark:text-emerald-400">
              <PackageCheck className="size-5" />
            </div>
            <div>
              <p className="text-2xl font-bold tracking-tight text-foreground">
                {availableUnitsCount}
              </p>
              <p className="text-xs text-muted-foreground">Disponíveis</p>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-border/80 shadow-xs">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex size-11 items-center justify-center rounded-xl border border-amber-200/80 bg-amber-50 text-amber-600 dark:border-amber-900/50 dark:bg-amber-950/50 dark:text-amber-400">
              <Clock className="size-5" />
            </div>
            <div>
              <p className="text-2xl font-bold tracking-tight text-foreground">
                {inUseUnitsCount}
              </p>
              <p className="text-xs text-muted-foreground">Em uso</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Barra de Filtros e Pesquisa */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-3">
          <div className="w-full sm:w-52">
            <ItemTypeSelect
              value={selectedItemStatus}
              onChange={(option) => handleStatusChange(option as SelectOption<ItemType> | null)}
            />
          </div>
        </div>

        <div className="relative">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Pesquisar item..."
            className="pl-9 bg-input/50 border-transparent rounded-3xl h-9"
          />
        </div>
      </div>

      {/* Tabela de Itens */}
      <DataTable
        columns={columns}
        data={items}
        isLoading={isLoading}
        page={page}
        perPage={perPage}
        onPageChange={setPage}
      />
    </div>
  )
}
