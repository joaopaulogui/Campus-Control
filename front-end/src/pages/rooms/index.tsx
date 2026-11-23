import { useEffect, useMemo, useState } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { DataTable, type DataTableColumnDef } from "@/components/data-table"
import { CanAccess } from "@/components/can-access"
import { FloorSelect } from "@/components/select/floor-select"
import { ActionAlertDialog } from "@/components/action-alert-dialog"
import { ModalForm } from "@/components/modal-form"
import RoomForm from "./form"
import { useAuth } from "@/hooks/use-auth"
import { room } from "@/services/room"
import { airConditioner, projector } from "@/services/equipment"
import type { Room, RoomType } from "@/types/room"
import { type SelectOption } from "@/components/async-react-select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from "react-toastify"
import {
  ChevronDown,
  ChevronRight,
  MoreHorizontal,
  Pencil,
  Plus,
  Search,
  Trash2,
} from "lucide-react"
import { RoomTypeSelect } from "@/components/select/room-type-select"
import { RoomStatusSelect } from "@/components/select/room-status-select"
import type { AirConditioner, Projector } from "@/types/equipment"
import {
  invalidateEquipmentRelatedQueries,
  invalidateRoomRelatedQueries,
} from "@/config/query-keys"
import RoomExpandedRow from "./room-expanded-row"

export default function RoomsPage() {
  const queryClient = useQueryClient()
  const { user } = useAuth()

  // Filtros e pesquisa
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFloor, setSelectedFloor] = useState<SelectOption | null>(null)
  const [selectedRoomType, setSelectedRoomType] = useState<SelectOption<RoomType> | null>(null)
  const [selectedRoomStatus, setSelectedRoomStatus] = useState<SelectOption<boolean> | null>(null)

  // Paginação
  const [page, setPage] = useState(1)
  const perPage = 9

  // Modais de ação
  const [openModalForm, setOpenModalForm] = useState(false)
  const [roomToEdit, setRoomToEdit] = useState<Room | null>(null)
  const [openAlertDeleteRoom, setOpenAlertDeleteRoom] = useState(false)
  const [openAlertDeleteAc, setOpenAlertDeleteAc] = useState(false)
  const [openAlertDeleteProj, setOpenAlertDeleteProj] = useState(false)
  const [roomToDelete, setRoomToDelete] = useState<Room | null>(null)
  const [acToDelete, setAcToDelete] = useState<AirConditioner | null>(null)
  const [projToDelete, setProjToDelete] = useState<Projector | null>(null)

  // Query de listagem das salas
  const { data: rooms = [], isLoading } = useQuery({
    queryKey: [
      "rooms",
      page,
      perPage,
      searchTerm,
      selectedFloor?.value,
      selectedRoomType?.value,
      selectedRoomStatus?.value,
    ],
    queryFn: () =>
      room.getList({
        page,
        perPage,
        name: searchTerm.trim() || undefined,
        floorId: selectedFloor?.value ? String(selectedFloor.value) : undefined,
        type: selectedRoomType?.value ? selectedRoomType?.value : undefined,
        isLocked: selectedRoomStatus?.value ? selectedRoomStatus?.value : undefined,
      }),
  })

  useEffect(() => {
    setPage(1)
  }, [searchTerm, selectedFloor, selectedRoomStatus, selectedRoomType])

  // Mutação de exclusão de sala
  const mutationDeleteRoom = useMutation({
    mutationFn: (id: string) => room.delete(id),
    onMutate() {
      toast.loading("Excluindo sala...", { toastId: "delete_room" })
    },
    onSuccess() {
      toast.update("delete_room", {
        render: "Sala excluída com sucesso",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      })
      setOpenAlertDeleteRoom(false)
      setRoomToDelete(null)
      invalidateRoomRelatedQueries(queryClient)
    },
    onError(error: unknown) {
      const err = error as { response?: { data?: { message?: string } } }
      toast.update("delete_room", {
        render: err.response?.data?.message ?? "Erro ao excluir sala",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      })
    },
  })

  // Mutação de exclusão de ar-condicionado
  const mutationDeleteAc = useMutation({
    mutationFn: (id: string) => airConditioner.delete(id),
    onMutate() {
      toast.loading("Excluindo ar-condicionado...", { toastId: "delete_ac" })
    },
    onSuccess() {
      toast.update("delete_ac", {
        render: "Ar-condicionado excluído com sucesso",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      })
      setOpenAlertDeleteAc(false)
      setAcToDelete(null)
      invalidateEquipmentRelatedQueries(queryClient, "ac")
    },
    onError(error: unknown) {
      const err = error as { response?: { data?: { message?: string } } }
      toast.update("delete_ac", {
        render: err.response?.data?.message ?? "Erro ao excluir ar-condicionado",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      })
    },
  })

  // Mutação de exclusão de projetor
  const mutationDeleteProj = useMutation({
    mutationFn: (id: string) => projector.delete(id),
    onMutate() {
      toast.loading("Excluindo projetor...", { toastId: "delete_proj" })
    },
    onSuccess() {
      toast.update("delete_proj", {
        render: "Projetor excluída com sucesso",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      })
      setOpenAlertDeleteProj(false)
      setProjToDelete(null)
      invalidateEquipmentRelatedQueries(queryClient, "projector")
    },
    onError(error: unknown) {
      const err = error as { response?: { data?: { message?: string } } }
      toast.update("delete_proj", {
        render: err.response?.data?.message ?? "Erro ao excluir projetor",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      })
    },
  })

  // Mutação de criação de ar-condicionado
  const mutationAddAc = useMutation({
    mutationFn: (roomId: string) => airConditioner.register({ roomId }),
    onMutate() {
      toast.loading("Adicionando ar-condicionado...", { toastId: "add_ac" })
    },
    onSuccess() {
      toast.update("add_ac", {
        render: "Ar-condicionado adicionado com sucesso",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      })
      invalidateEquipmentRelatedQueries(queryClient, "ac")
    },
    onError(error: unknown) {
      const err = error as { response?: { data?: { message?: string } } }
      toast.update("add_ac", {
        render: err.response?.data?.message ?? "Erro ao adicionar ar-condicionado",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      })
    },
  })

  // Mutação de criação de ar-condicionado
  const mutationAddProj = useMutation({
    mutationFn: (roomId: string) => projector.register({ roomId }),
    onMutate() {
      toast.loading("Adicionando projetor...", { toastId: "add_proj" })
    },
    onSuccess() {
      toast.update("add_proj", {
        render: "Projetor adicionado com sucesso",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      })
      invalidateEquipmentRelatedQueries(queryClient, "projector")
    },
    onError(error: unknown) {
      const err = error as { response?: { data?: { message?: string } } }
      toast.update("add_proj", {
        render: err.response?.data?.message ?? "Erro ao adicionar projetor",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      })
    },
  })

  // Mutação para alternar tranca (abrir/fechar sala)
  const mutationToggleLock = useMutation({
    mutationFn: (id: string) => room.toogleLock(id),
    onMutate() {
      toast.loading("Atualizando status da sala...", { toastId: "toggle_lock" })
    },
    onSuccess() {
      toast.update("toggle_lock", {
        render: "Status da sala atualizado",
        type: "success",
        isLoading: false,
        autoClose: 1500,
      })
      invalidateRoomRelatedQueries(queryClient)
    },
    onError(error: unknown) {
      const err = error as { response?: { data?: { message?: string } } }
      toast.update("toggle_lock", {
        render: err.response?.data?.message ?? "Erro ao alterar status da sala",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      })
    },
  })

  // Mutação para alternar energia do ar-condicionado
  const mutationToggleAc = useMutation({
    mutationFn: (id: string) => airConditioner.toogle(id),
    onSuccess() {
      invalidateEquipmentRelatedQueries(queryClient, "ac")
    },
    onError(error: unknown) {
      const err = error as { response?: { data?: { message?: string } } }
      toast.error(err.response?.data?.message ?? "Erro ao alterar energia do ar-condicionado")
    },
  })

  function handleOpenCreate() {
    setRoomToEdit(null)
    setOpenModalForm(true)
  }

  function handleOpenEdit(targetRoom: Room) {
    setRoomToEdit(targetRoom)
    setOpenModalForm(true)
  }

  function handleDeleteRoom(targetRoom: Room) {
    setRoomToDelete(targetRoom)
    setOpenAlertDeleteRoom(true)
  }

  function handleDeleteAc(targetAc: AirConditioner) {
    setAcToDelete(targetAc)
    setOpenAlertDeleteAc(true)
  }

  function handleDeleteProj(targetProj: Projector) {
    setProjToDelete(targetProj)
    setOpenAlertDeleteProj(true)
  }

  function confirmDeleteRoom() {
    if (roomToDelete) {
      mutationDeleteRoom.mutate(roomToDelete.id)
    }
  }

  function confirmDeleteAc() {
    if (acToDelete) {
      mutationDeleteAc.mutate(acToDelete.id)
    }
  }

  function confirmDeleteProj() {
    if (projToDelete) {
      mutationDeleteProj.mutate(projToDelete.id)
    }
  }

  // Definição das colunas da tabela
  const columns = useMemo<DataTableColumnDef<Room>[]>(
    () => [
      {
        id: "name",
        header: "SALA",
        cell: ({ row }) => {
          const room = row.original
          const airConditioners = room.airConditioners ?? []
          const projectors = room.projectors ?? []

          const airConditionersOn = airConditioners?.filter(a => a.isOn)
          const airConditionersWorking = airConditioners?.filter(a => a.status === "WORKING")
          const projectorsWorking = projectors?.filter(a => a.status === "WORKING")

          return (
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={row.getToggleExpandedHandler()}
                title={row.getIsExpanded() ? "Recolher detalhes" : "Expandir detalhes"}
              >
                {row.getIsExpanded() ? <ChevronDown className="size-4 text-primary" /> : <ChevronRight className="size-4" />}
              </Button>

              <div className="flex flex-col justify-center gap-1.5">
                <span className="flex items-center text-sm font-semibold text-foreground">
                  {room.name}
                </span>

                <div className="flex gap-1">
                  {/* Status dos Ar-condicionado que funcionam */}
                  {airConditionersOn?.length > 0 && airConditionersWorking?.length > 0 ?
                    <Badge variant="success" className="text-[11px] font-medium gap-1">
                      {`AC ${airConditionersOn?.length ?? 0}/${airConditionersWorking.length}`}
                    </Badge> : <></>}

                  {/* Condição dos Ar-condicionados */}
                  {airConditioners?.length > 0 ?
                    <Badge variant="outline" className="text-[11px] font-medium gap-1">
                      {`AC ${airConditionersWorking?.length ?? 0}/${airConditioners.length}`}
                    </Badge> : <></>}

                  {/* Condição dos projetores*/}
                  {projectors?.length > 0 ?
                    <Badge variant="outline" className="text-[11px] font-medium gap-1">
                      {`P ${projectorsWorking?.length ?? 0}/${projectors.length}`}
                    </Badge> : <></>}
                </div>
              </div>
            </div>
          )
        },
      },
      {
        id: "floor",
        header: "ANDAR",
        cell: ({ row }) => (
          <span className="text-sm text-foreground/80">
            {row.original.floorName}
          </span>
        ),
      },
      {
        id: "status",
        header: "STATUS",
        cell: ({ row }) => {
          const isLocked = row.original.isLocked
          return !isLocked ? (
            <Badge variant="info">
              Aberta
            </Badge>
          ) : (
            <Badge variant="outline">
              Trancada
            </Badge>
          )
        },
      },
      {
        id: "actions",
        header: () => <div className="text-right">AÇÃO</div>,
        cell: ({ row }) => {
          const targetRoom = row.original
          return (
            <div className="flex items-center justify-end gap-2">
              <Button
                variant="outline"
                size="xs"
                disabled={mutationToggleLock.isPending}
                onClick={() => mutationToggleLock.mutate(targetRoom.id)}
              >
                {targetRoom.isLocked ? "Abrir" : "Fechar"}
              </Button>

              {/* Botão de ações restrito a Administradores */}
              <CanAccess allowedRoles={["ADMIN"]}>
                <DropdownMenu>
                  <DropdownMenuTrigger className="size-8 rounded-lg text-muted-foreground hover:text-foreground">
                    <MoreHorizontal className="size-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-36">
                    <DropdownMenuItem onClick={() => handleOpenEdit(targetRoom)}>
                      <Pencil className="size-4" />
                      Editar
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      variant="destructive"
                      onClick={() => handleDeleteRoom(targetRoom)}
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
    ],
    [mutationToggleLock]
  )

  return (
    <div className="flex w-full flex-col gap-6">
      {/* Diálogo de confirmação para exclusão de sala*/}
      <ActionAlertDialog
        open={openAlertDeleteRoom}
        setOpen={setOpenAlertDeleteRoom}
        title="Excluir sala"
        subtitle={`Tem certeza que deseja excluir ${roomToDelete?.name ?? "esta sala"}? Esta ação não pode ser desfeita.`}
        textActionButton="Confirmar"
        action={confirmDeleteRoom}
      />

      {/* Diálogo de confirmação para exclusão de ar-condicionado*/}
      <ActionAlertDialog
        open={openAlertDeleteAc}
        setOpen={setOpenAlertDeleteAc}
        title="Excluir ar-condicionado"
        subtitle={`Tem certeza que deseja excluir este ar-condicionado? Esta ação não pode ser desfeita.`}
        textActionButton="Confirmar"
        action={confirmDeleteAc}
      />

      {/* Diálogo de confirmação para exclusão de projetor*/}
      <ActionAlertDialog
        open={openAlertDeleteProj}
        setOpen={setOpenAlertDeleteProj}
        title="Excluir projetor"
        subtitle={`Tem certeza que deseja excluir este projetor? Esta ação não pode ser desfeita.`}
        textActionButton="Confirmar"
        action={confirmDeleteProj}
      />

      {/* Modal centralizado para criação / edição de sala */}
      <ModalForm
        open={openModalForm}
        setOpen={setOpenModalForm}
        title={roomToEdit ? "Editar sala" : "Adicionar sala"}
        subtitle="Preencha os dados da sala"
      >
        <RoomForm
          key={roomToEdit?.id ?? "new-room"}
          roomId={roomToEdit?.id}
          back={() => setOpenModalForm(false)}
        />
      </ModalForm>

      {/* Cabeçalho principal */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Salas
          </h1>
          <p className="text-sm text-muted-foreground">
            {user?.role === "ADMIN"
              ? "Gerencie as salas do campus"
              : "Visualize e controle as salas"}
          </p>
        </div>

        <CanAccess allowedRoles={["ADMIN"]}>
          <Button
            onClick={handleOpenCreate}
            className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90"
          >
            <Plus className="size-4" />
            Adicionar sala
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
            placeholder="Pesquisar sala..."
            className="pl-9 bg-input/50 border-transparent rounded-3xl h-9"
          />
        </div>

        <FloorSelect
          value={selectedFloor}
          onChange={setSelectedFloor}
        />

        <RoomTypeSelect
          value={selectedRoomType}
          onChange={(option) => { setSelectedRoomType(option as SelectOption<RoomType> | null) }}
        />

        <RoomStatusSelect
          value={selectedRoomStatus}
          onChange={(option) => setSelectedRoomStatus(option as SelectOption<boolean> | null)}
        />
      </div>

      {/* Tabela de Salas */}
      <DataTable
        columns={columns}
        data={rooms}
        isLoading={isLoading}
        page={page}
        perPage={perPage}
        onPageChange={setPage}
        expandableRow={({ row }) =>
          <RoomExpandedRow
            room={row.original}
            onAddAc={(roomId) => mutationAddAc.mutate(roomId)}
            onDeleteAc={handleDeleteAc}
            onToggleAc={(acId) => mutationToggleAc.mutate(acId)}
            isTogglingAc={mutationToggleAc.isPending}
            onAddProj={(roomId) => mutationAddProj.mutate(roomId)}
            onDeleteProj={handleDeleteProj}
          />
        }
      />
    </div>
  )
}