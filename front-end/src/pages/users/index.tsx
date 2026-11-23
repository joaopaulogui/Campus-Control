import { useState, useMemo } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { DataTable, type DataTableColumnDef } from "@/components/data-table"
import { CanAccess } from "@/components/can-access"
import { ActionAlertDialog } from "@/components/action-alert-dialog"
import { ModalForm } from "@/components/modal-form"
import UserForm from "./form"
import { user } from "@/services/user"
import type { User, UserRole } from "@/types/user"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { UserRoleSelect } from "@/components/select/user-role-select"
import type { SelectOption } from "@/components/async-react-select"
import { formatDate } from "@/utils/date"
import { toast } from "react-toastify"
import {
  MoreHorizontal,
  Pencil,
  Plus,
  Search,
  ShieldCheck,
  Trash2,
  UserCheck,
  Users,
} from "lucide-react"
import IconContainer from "@/components/icon-container"
import { invalidateUserRelatedQueries } from "@/config/query-keys"

export default function UsersPage() {
  const queryClient = useQueryClient()

  // Filtros e pesquisa
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRole, setSelectedRole] = useState<SelectOption<UserRole> | null>(null)

  // Paginação
  const [page, setPage] = useState(1)
  const perPage = 9

  // Modais de ação
  const [openModalForm, setOpenModalForm] = useState(false)
  const [userToEdit, setUserToEdit] = useState<User | null>(null)
  const [openAlertDeleteUser, setOpenAlertDeleteUser] = useState(false)
  const [userToDelete, setUserToDelete] = useState<User | null>(null)

  // Listagem de usuários
  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users", searchTerm, selectedRole?.value],
    queryFn: () =>
      user.getList({
        name: searchTerm.trim() || undefined,
        role: selectedRole?.value,
      }),
  })

  function handleSearchChange(value: string) {
    setSearchTerm(value)
    setPage(1)
  }

  function handleRoleChange(option: SelectOption<UserRole> | null) {
    setSelectedRole(option)
    setPage(1)
  }

  // KPIs
  const adminCount = useMemo(
    () => users.filter((u) => u.role === "ADMIN").length,
    [users]
  )
  const memberCount = useMemo(
    () => users.filter((u) => u.role === "MEMBER").length,
    [users]
  )

  // Mutação para exclusão de usuário
  const mutationDeleteUser = useMutation({
    mutationFn: (id: string) => user.delete(id),
    onMutate() {
      toast.loading("Excluindo usuário...", { toastId: "delete_user" })
    },
    onSuccess() {
      toast.update("delete_user", {
        render: "Usuário excluído com sucesso",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      })
      setOpenAlertDeleteUser(false)
      setUserToDelete(null)
      invalidateUserRelatedQueries(queryClient)
    },
    onError(err: unknown) {
      const errorObj = err as { response?: { data?: { message?: string } } }
      toast.update("delete_user", {
        render: errorObj.response?.data?.message ?? "Erro ao excluir usuário",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      })
    },
  })

  function handleOpenCreate() {
    setUserToEdit(null)
    setOpenModalForm(true)
  }

  function handleOpenEdit(targetUser: User) {
    setUserToEdit(targetUser)
    setOpenModalForm(true)
  }

  function handleDeleteUser(targetUser: User) {
    setUserToDelete(targetUser)
    setOpenAlertDeleteUser(true)
  }

  function confirmDeleteUser() {
    if (!userToDelete) return
    mutationDeleteUser.mutate(userToDelete.id)
  }

  // Definição das colunas da tabela de Usuários
  const columns = useMemo<DataTableColumnDef<User>[]>(
    () => [
      {
        accessorKey: "name",
        header: () => (
          <span className="text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
            Usuário
          </span>
        ),
        cell: ({ row }) => {
          const u = row.original
          return (
            <div className="flex items-center gap-3">
              <IconContainer
                icon={<Users className="size-4" />}
                size="size-10"
              />
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-foreground">
                  {u.name}
                </span>
                <span className="text-xs text-muted-foreground">{u.email}</span>
              </div>
            </div>
          )
        },
      },
      {
        accessorKey: "role",
        header: () => (
          <span className="text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
            Perfil de acesso
          </span>
        ),
        cell: ({ row }) => {
          const role = row.original.role
          if (role === "ADMIN") {
            return (
              <Badge variant="purple" className="gap-1.5 font-normal">
                <span className="size-1.5 rounded-full bg-purple-500" />
                Administrador
              </Badge>
            )
          }
          return (
            <Badge variant="info" className="gap-1.5 font-normal">
              <span className="size-1.5 rounded-full bg-blue-500" />
              Membro
            </Badge>
          )
        },
      },
      {
        accessorKey: "updatedAt",
        header: () => (
          <span className="text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
            Data de atualização
          </span>
        ),
        cell: ({ row }) => (
          <span className="text-xs text-muted-foreground">
            {formatDate(row.original.updatedAt || row.original.createdAt)}
          </span>
        ),
      },
      {
        id: "actions",
        header: () => (
          <div className="text-right text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
            Ação
          </div>
        ),
        cell: ({ row }) => {
          const targetUser = row.original
          return (
            <div className="flex items-center justify-end gap-2">
              <CanAccess allowedRoles={["ADMIN"]}>
                <DropdownMenu>
                  <DropdownMenuTrigger className="size-8 rounded-lg text-muted-foreground hover:text-foreground">
                    <MoreHorizontal className="size-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-36">
                    <DropdownMenuItem onClick={() => handleOpenEdit(targetUser)}>
                      <Pencil className="size-4" />
                      Editar
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      variant="destructive"
                      onClick={() => handleDeleteUser(targetUser)}
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
    []
  )

  return (
    <div className="flex w-full flex-col gap-6">
      {/* Diálogo de confirmação para exclusão de usuário */}
      <ActionAlertDialog
        open={openAlertDeleteUser}
        setOpen={setOpenAlertDeleteUser}
        title="Excluir usuário"
        subtitle={`Tem certeza que deseja excluir ${userToDelete?.name ?? "este usuário"}? Esta ação não pode ser desfeita.`}
        textActionButton="Confirmar"
        action={confirmDeleteUser}
      />

      {/* Modal centralizado para criação / edição de usuário */}
      <ModalForm
        open={openModalForm}
        setOpen={setOpenModalForm}
        title={userToEdit ? "Editar usuário" : "Adicionar usuário"}
        subtitle="Preencha os dados do usuário"
      >
        <UserForm
          key={userToEdit?.id ?? "new-user"}
          userId={userToEdit?.id}
          back={() => setOpenModalForm(false)}
        />
      </ModalForm>

      {/* Cabeçalho principal */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Usuários
          </h1>
          <p className="text-sm text-muted-foreground">
            Gerencie os usuários e permissões de acesso ao campus
          </p>
        </div>

        <CanAccess allowedRoles={["ADMIN"]}>
          <Button
            onClick={handleOpenCreate}
            className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90"
          >
            <Plus className="size-4" />
            Adicionar usuário
          </Button>
        </CanAccess>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card className="rounded-2xl border-border/80 shadow-xs">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex size-11 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
              <Users className="size-5" />
            </div>
            <div>
              <p className="text-2xl font-bold tracking-tight text-foreground">
                {users.length}
              </p>
              <p className="text-xs text-muted-foreground">Total de usuários</p>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-border/80 shadow-xs">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex size-11 items-center justify-center rounded-xl border border-purple-200/80 bg-purple-50 text-purple-600 dark:border-purple-900/50 dark:bg-purple-950/50 dark:text-purple-400">
              <ShieldCheck className="size-5" />
            </div>
            <div>
              <p className="text-2xl font-bold tracking-tight text-foreground">
                {adminCount}
              </p>
              <p className="text-xs text-muted-foreground">Administradores</p>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-border/80 shadow-xs">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex size-11 items-center justify-center rounded-xl border border-blue-200/80 bg-blue-50 text-blue-600 dark:border-blue-900/50 dark:bg-blue-950/50 dark:text-blue-400">
              <UserCheck className="size-5" />
            </div>
            <div>
              <p className="text-2xl font-bold tracking-tight text-foreground">
                {memberCount}
              </p>
              <p className="text-xs text-muted-foreground">Membros</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Barra de Filtros e Pesquisa */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-3">
          <div className="w-52">
            <UserRoleSelect
              value={selectedRole}
              onChange={(option) => handleRoleChange(option as SelectOption<UserRole> | null)}
            />
          </div>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Pesquisar por nome ou e-mail..."
            className="h-10 rounded-xl bg-input/40 pl-9"
          />
        </div>
      </div>

      {/* Tabela de Usuários */}
      <DataTable
        columns={columns}
        data={users}
        isLoading={isLoading}
        page={page}
        perPage={perPage}
        onPageChange={setPage}
      />
    </div>
  )
}
