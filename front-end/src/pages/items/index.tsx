import { useEffect, useState, useMemo } from "react"
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
  Package,
  MoreHorizontal,
  Plus,
  Search,
  Trash2,
} from "lucide-react"
import IconContainer from "@/components/icon-container"
import { Badge } from "@/components/ui/badge"
import { ItemTypeSelect } from "@/components/select/item-type-select"
import type { SelectOption } from "@/components/async-react-select"

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

  useEffect(() => {
    setPage(1)
  }, [searchTerm])

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
      queryClient.invalidateQueries({ queryKey: ["items"] })
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

  /*
  function handleOpenEdit(targetItem: Item) {
    setItemToEdit(targetItem)
    setOpenModalForm(true)
  }
  */

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
        header: "QUANTIDADE DISPONÍVEL",
        cell: ({ row }) => {
          const total = row.original.totalQuantity
          const onHold = row.original.onHoldQuantity
          const onPct = total > 0 ? (onHold / total) * 100 : 0
          return (
            <div className="flex flex-col gap-2">
              <div className="flex gap-1 items-center">
                <p className="font-semibold text-foreground">{onHold}</p>
                <p className="text-xs text-muted-foreground">/ {total}</p>
              </div>
              <div className="h-1.5 w-32 overflow-hidden rounded-full bg-white border border-gray-300">
                <div
                  style={{ width: `${onPct}%` }}
                  className="h-full rounded-full bg-green-600 transition-all"
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
          const available = row.original.availableQuantity
          const status = available === 0

          return (
            <Badge variant={status ? "success" : "destructive"}>
              {status ? "Disponível" : "Indisponível"}
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
                    {/*<DropdownMenuItem onClick={() => handleOpenEdit(targetItem)}>
                    <Pencil className="size-4" />
                    Editar
                  </DropdownMenuItem>*/}
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
          //itemId={itemToEdit?.id}
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
            Gerencie os itens do campus
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

      {/* Barra de Filtros e Pesquisa */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 items-center gap-3">
        <div className="relative">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value) }}
            placeholder="Pesquisar item..."
            className="pl-9 bg-input/50 border-transparent rounded-3xl h-9"
          />
        </div>

        <ItemTypeSelect
          value={selectedItemStatus}
          onChange={(option) => setSelectedItemStatus(option as SelectOption<ItemType> | null)}
        />
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