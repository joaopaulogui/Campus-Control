import { useEffect, useState } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { DataTable, type DataTableColumnDef } from "@/components/data-table"
import { CanAccess } from "@/components/can-access"
import { ActionAlertDialog } from "@/components/action-alert-dialog"
import { ModalForm } from "@/components/modal-form"
import FloorForm from "./form"
import { floor } from "@/services/floor"
import type { Floor } from "@/types/floor"
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
  Layers,
  MoreHorizontal,
  Pencil,
  Plus,
  Search,
  Trash2,
} from "lucide-react"
import IconContainer from "@/components/icon-container"
import type { SelectOption } from "@/components/async-react-select"
import { BuildingSelect } from "@/components/select/building-select"

export default function FloorsPage() {
  const queryClient = useQueryClient()

  // Filtros e pesquisa
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedBuilding, setSelectedBuilding] = useState<SelectOption | null>(null)

  // Paginação
  const [page, setPage] = useState(1)
  const perPage = 9

  // Modais de ação
  const [openModalForm, setOpenModalForm] = useState(false)
  const [floorToEdit, setFloorToEdit] = useState<Floor | null>(null)
  const [openAlertDeleteFloor, setOpenAlertDeleteFloor] = useState(false)
  const [floorToDelete, setFloorToDelete] = useState<Floor | null>(null)

  const { data: floors = [], isLoading } = useQuery({
    queryKey: [
      "floors",
      page,
      perPage,
      searchTerm,
      selectedBuilding
    ],
    queryFn: () =>
      floor.getList({
        page,
        perPage,
        name: searchTerm.trim() || undefined,
        buildingId: selectedBuilding?.value ? String(selectedBuilding?.value) : undefined
      }),
  })

  useEffect(() => {
    setPage(1)
  }, [searchTerm])

  // Mutação de exclusão de andar
  const mutationDeleteFloor = useMutation({
    mutationFn: (id: string) => floor.delete(id),
    onMutate() {
      toast.loading("Excluindo andar...", { toastId: "delete_floor" })
    },
    onSuccess() {
      toast.update("delete_floor", {
        render: "Andare excluído com sucesso",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      })
      setOpenAlertDeleteFloor(false)
      setFloorToDelete(null)
      queryClient.invalidateQueries({ queryKey: ["floors"] })
    },
    onError(error: unknown) {
      const err = error as { response?: { data?: { message?: string } } }
      toast.update("delete_floor", {
        render: err.response?.data?.message ?? "Erro ao excluir andar",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      })
    },
  })

  function handleOpenCreate() {
    setFloorToEdit(null)
    setOpenModalForm(true)
  }

  function handleOpenEdit(targetFloor: Floor) {
    setFloorToEdit(targetFloor)
    setOpenModalForm(true)
  }

  function handleDeleteFloor(targetFloor: Floor) {
    setFloorToDelete(targetFloor)
    setOpenAlertDeleteFloor(true)
  }

  function confirmDeleteFloor() {
    if (floorToDelete) {
      mutationDeleteFloor.mutate(floorToDelete.id)
    }
  }

  // Definição das colunas da tabela
  const columns: DataTableColumnDef<Floor>[] = [
    {
      id: "name",
      header: "ANDAR",
      cell: ({ row }) => {
        const floor = row.original

        return (
          <div className="flex items-center gap-3">
            <IconContainer
              icon={<Layers className="size-4" />}
              size="size-10"
            />

            <span className="flex items-center text-sm font-semibold text-foreground">
              {floor.name}
            </span>
          </div>
        )
      },
    },
    {
      id: "buildingName",
      header: "BLOCO",
      cell: ({ row }) => row.original.buildingName
    },
    {
      id: "actions",
      header: () => <div className="text-right">AÇÃO</div>,
      cell: ({ row }) => {
        const targetFloor = row.original
        return (
          <div className="flex items-center justify-end gap-2">
            {/* Botão de ações restrito a Administradores */}
            <CanAccess allowedRoles={["ADMIN"]}>
              <DropdownMenu>
                <DropdownMenuTrigger className="size-8 rounded-lg text-muted-foreground hover:text-foreground">
                  <MoreHorizontal className="size-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-36">
                  <DropdownMenuItem onClick={() => handleOpenEdit(targetFloor)}>
                    <Pencil className="size-4" />
                    Editar
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    variant="destructive"
                    onClick={() => handleDeleteFloor(targetFloor)}
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
  ]

  return (
    <div className="flex w-full flex-col gap-6">
      {/* Diálogo de confirmação para exclusão de andar*/}
      <ActionAlertDialog
        open={openAlertDeleteFloor}
        setOpen={setOpenAlertDeleteFloor}
        title="Excluir andar"
        subtitle={`Tem certeza que deseja excluir ${floorToDelete?.name ?? "este andar"}? Esta ação não pode ser desfeita.`}
        textActionButton="Confirmar"
        action={confirmDeleteFloor}
      />

      {/* Modal centralizado para criação / edição de andar */}
      <ModalForm
        open={openModalForm}
        setOpen={setOpenModalForm}
        title={floorToEdit ? "Editar andar" : "Adicionar andar"}
        subtitle="Preencha os dados do andar"
      >
        <FloorForm
          key={floorToEdit?.id ?? "new-floor"}
          floorId={floorToEdit?.id}
          back={() => setOpenModalForm(false)}
        />
      </ModalForm>

      {/* Cabeçalho principal */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Andares
          </h1>
          <p className="text-sm text-muted-foreground">
            Gerencie os andares do campus
          </p>
        </div>

        <CanAccess allowedRoles={["ADMIN"]}>
          <Button
            onClick={handleOpenCreate}
            className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90"
          >
            <Plus className="size-4" />
            Adicionar andar
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
            placeholder="Pesquisar andar..."
            className="pl-9 bg-input/50 border-transparent rounded-3xl h-9"
          />
        </div>

        <BuildingSelect
          value={selectedBuilding}
          onChange={setSelectedBuilding}
        />
      </div>

      {/* Tabela de Andares */}
      <DataTable
        columns={columns}
        data={floors}
        isLoading={isLoading}
        page={page}
        perPage={perPage}
        onPageChange={setPage}
      />
    </div>
  )
}