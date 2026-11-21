import { useEffect, useState } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { DataTable, type DataTableColumnDef } from "@/components/data-table"
import { CanAccess } from "@/components/can-access"
import { ActionAlertDialog } from "@/components/action-alert-dialog"
import { ModalForm } from "@/components/modal-form"
import BuildingForm from "./form"
import { building } from "@/services/building"
import type { Building } from "@/types/building"
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
  Building2,
  MoreHorizontal,
  Pencil,
  Plus,
  Search,
  Trash2,
} from "lucide-react"
import IconContainer from "@/components/icon-container"

export default function BuildingsPage() {
  const queryClient = useQueryClient()

  // Filtros e pesquisa
  const [searchTerm, setSearchTerm] = useState("")

  // Paginação
  const [page, setPage] = useState(1)
  const perPage = 9

  // Modais de ação
  const [openModalForm, setOpenModalForm] = useState(false)
  const [buildingToEdit, setBuildingToEdit] = useState<Building | null>(null)
  const [openAlertDeleteBuilding, setOpenAlertDeleteBuilding] = useState(false)
  const [buildingToDelete, setBuildingToDelete] = useState<Building | null>(null)

  const { data: buildings = [], isLoading } = useQuery({
    queryKey: [
      "buildings",
      page,
      perPage,
      searchTerm,
    ],
    queryFn: () =>
      building.getList({
        page,
        perPage,
        name: searchTerm.trim() || undefined
      }),
  })

  useEffect(() => {
    setPage(1)
  }, [searchTerm])

  // Mutação de exclusão de bloco
  const mutationDeleteBuilding = useMutation({
    mutationFn: (id: string) => building.delete(id),
    onMutate() {
      toast.loading("Excluindo bloco...", { toastId: "delete_building" })
    },
    onSuccess() {
      toast.update("delete_building", {
        render: "Bloco excluído com sucesso",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      })
      setOpenAlertDeleteBuilding(false)
      setBuildingToDelete(null)
      queryClient.invalidateQueries({ queryKey: ["buildings"] })
    },
    onError(error: unknown) {
      const err = error as { response?: { data?: { message?: string } } }
      toast.update("delete_building", {
        render: err.response?.data?.message ?? "Erro ao excluir bloco",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      })
    },
  })

  function handleOpenCreate() {
    setBuildingToEdit(null)
    setOpenModalForm(true)
  }

  function handleOpenEdit(targetBuilding: Building) {
    setBuildingToEdit(targetBuilding)
    setOpenModalForm(true)
  }

  function handleDeleteBuilding(targetBuilding: Building) {
    setBuildingToDelete(targetBuilding)
    setOpenAlertDeleteBuilding(true)
  }

  function confirmDeleteBuilding() {
    if (buildingToDelete) {
      mutationDeleteBuilding.mutate(buildingToDelete.id)
    }
  }

  // Definição das colunas da tabela
  const columns: DataTableColumnDef<Building>[] = [
    {
      id: "name",
      header: "BLOCO",
      cell: ({ row }) => {
        const building = row.original

        return (
          <div className="flex items-center gap-3">
            <IconContainer
              icon={<Building2 className="size-4" />}
              size="size-10"
            />

            <span className="flex items-center text-sm font-semibold text-foreground">
              {building.name}
            </span>
          </div>
        )
      },
    },
    {
      id: "actions",
      header: () => <div className="text-right">AÇÃO</div>,
      cell: ({ row }) => {
        const targetBuilding = row.original
        return (
          <div className="flex items-center justify-end gap-2">
            {/* Botão de ações restrito a Administradores */}
            <CanAccess allowedRoles={["ADMIN"]}>
              <DropdownMenu>
                <DropdownMenuTrigger className="size-8 rounded-lg text-muted-foreground hover:text-foreground">
                  <MoreHorizontal className="size-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-36">
                  <DropdownMenuItem onClick={() => handleOpenEdit(targetBuilding)}>
                    <Pencil className="size-4" />
                    Editar
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    variant="destructive"
                    onClick={() => handleDeleteBuilding(targetBuilding)}
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
      {/* Diálogo de confirmação para exclusão de bloco*/}
      <ActionAlertDialog
        open={openAlertDeleteBuilding}
        setOpen={setOpenAlertDeleteBuilding}
        title="Excluir bloco"
        subtitle={`Tem certeza que deseja excluir ${buildingToDelete?.name ?? "este bloco"}? Esta ação não pode ser desfeita.`}
        textActionButton="Confirmar"
        action={confirmDeleteBuilding}
      />

      {/* Modal centralizado para criação / edição de bloco */}
      <ModalForm
        open={openModalForm}
        setOpen={setOpenModalForm}
        title={buildingToEdit ? "Editar bloco" : "Adicionar bloco"}
        subtitle="Preencha os dados do bloco"
      >
        <BuildingForm
          key={buildingToEdit?.id ?? "new-building"}
          buildingId={buildingToEdit?.id}
          back={() => setOpenModalForm(false)}
        />
      </ModalForm>

      {/* Cabeçalho principal */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Blocos
          </h1>
          <p className="text-sm text-muted-foreground">
            Gerencie os blocos do campus
          </p>
        </div>

        <CanAccess allowedRoles={["ADMIN"]}>
          <Button
            onClick={handleOpenCreate}
            className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90"
          >
            <Plus className="size-4" />
            Adicionar bloco
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
            placeholder="Pesquisar bloco..."
            className="pl-9 bg-input/50 border-transparent rounded-3xl h-9"
          />
        </div>
      </div>

      {/* Tabela de Blocos */}
      <DataTable
        columns={columns}
        data={buildings}
        isLoading={isLoading}
        page={page}
        perPage={perPage}
        onPageChange={setPage}
      />
    </div>
  )
}