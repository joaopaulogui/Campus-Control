import EquipmentStatusBlock from "@/components/equipment-status-block"
import { SectionDividerHeader } from "@/components/section-divider-header"
import StatCard from "@/components/stat-card"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { useAuth } from "@/hooks/use-auth"
import { airConditioner, projector } from "@/services/equipment"
import { item } from "@/services/item"
import { loan } from "@/services/loan"
import { room } from "@/services/room"
import { formatActivityDate, formatHeaderDate } from "@/utils/date"
import { summarizeEquipmentStatus } from "@/utils/equipment"
import { useQuery } from "@tanstack/react-query"
import { BookOpen, Box, CheckCircle2, Clock, DoorOpen, ProjectorIcon, TriangleAlert, Wind } from "lucide-react"
import { useMemo } from "react"

const fetchRooms = () => room.getList({perPage: 0})
const fetchAirConditioners = () => airConditioner.getList({})
const fetchProjectors = () => projector.getList({})
const fetchItems = () => item.getList({perPage: 0})
const fetchLoans = () => loan.getList({perPage: 0})

export default function Index() {

    const { user } = useAuth()

    const { data: rooms = [], isLoading: isLoadingRooms } = useQuery({
        queryKey: ["rooms", "all"],
        queryFn: fetchRooms,
    })

    const { data: items = [], isLoading: isLoadingItems } = useQuery({
        queryKey: ["items", "all"],
        queryFn: fetchItems,
    })

    const { data: loans = [], isLoading: isLoadingLoans } = useQuery({
        queryKey: ["loans", "all"],
        queryFn: fetchLoans,
    })

    const { data: airConditioners = [], isLoading: isLoadingAC } = useQuery({
        queryKey: ["air-conditioners", "all"],
        queryFn: fetchAirConditioners,
    })

    const { data: projectors = [], isLoading: isLoadingProjectors } = useQuery({
        queryKey: ["projectors", "all"],
        queryFn: fetchProjectors,
    })

    // Métricas dos 4 cards superiores
    const openRoomsCount = useMemo(
        () => rooms.filter((room) => !room.isLocked).length,
        [rooms]
    )

    const availableItemsCount = useMemo(
        () => items.reduce((acc, item) => acc + item.availableQuantity, 0),
        [items]
    )

    const activeLoansCount = useMemo(
        () => loans.filter((loan) => loan.status === "IN_USE").length,
        [loans]
    )

    const lateLoansCount = useMemo(
        () => loans.filter((loan) => loan.status === "LATE").length,
        [loans]
    )

    // Atividades recentes ordenadas pela data do último evento
    const recentActivities = useMemo(() => {
        return [...loans]
            .sort((a, b) => {
                const dateA = new Date(
                    a.status === "RETURNED" && a.returnedAt ? a.returnedAt : a.createdAt
                ).getTime()
                const dateB = new Date(
                    b.status === "RETURNED" && b.returnedAt ? b.returnedAt : b.createdAt
                ).getTime()
                return dateB - dateA
            })
            .slice(0, 6)
    }, [loans])

    // Métricas de infraestrutura
    const acStats = useMemo(
        () => summarizeEquipmentStatus(airConditioners),
        [airConditioners]
    )
    const acOnCount = useMemo(
        () => airConditioners.filter((ac) => ac.isOn).length,
        [airConditioners]
    )

    const projectorStats = useMemo(
        () => summarizeEquipmentStatus(projectors),
        [projectors]
    )

    const hasEquipmentAttention =
        acStats.broken +
        acStats.warning +
        projectorStats.broken +
        projectorStats.warning >
        0

    const formattedToday = useMemo(() => formatHeaderDate(new Date()), [])

    return (
        <div className="flex w-full flex-col gap-6">
            {/* Cabeçalho de boas-vindas */}
            <div className="space-y-1">
                <h1 className="text-2xl font-bold tracking-tight text-foreground">
                    Bem-vindo, {user?.name ?? "Usuário"}
                </h1>
                <p className="text-sm text-muted-foreground">{formattedToday}</p>
            </div>

            {/* Grid de 4 KPIs */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <StatCard
                    title="Salas Abertas"
                    value={openRoomsCount}
                    subtitle={`de ${rooms.length} salas`}
                    icon={<DoorOpen className="size-5" />}
                    iconContainerClassName="bg-success/10 text-success"
                    isLoading={isLoadingRooms}
                />

                <StatCard
                    title="Itens Disponíveis"
                    value={availableItemsCount}
                    subtitle="unidades em estoque"
                    icon={<Box className="size-5" />}
                    iconContainerClassName="bg-primary/10 text-primary"
                    isLoading={isLoadingItems}
                />

                <StatCard
                    title="Empréstimos Ativos"
                    value={activeLoansCount}
                    subtitle="em andamento"
                    icon={<BookOpen className="size-5" />}
                    iconContainerClassName="bg-muted text-muted-foreground"
                    isLoading={isLoadingLoans}
                />

                <StatCard
                    title="Empréstimos Atrasados"
                    value={lateLoansCount}
                    subtitle="requer atenção"
                    icon={<Clock className="size-5" />}
                    iconContainerClassName="bg-destructive/10 text-destructive"
                    isLoading={isLoadingLoans}
                />
            </div>

            {/* Grid principal: Atividades Recentes (2/3) + Infraestrutura (1/3) */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                {/* Coluna Esquerda: Atividades Recentes */}
                <Card className="rounded-2xl border-border/80 shadow-xs lg:col-span-2">
                    <CardContent className="flex flex-col gap-4 px-6 py-0.5">
                        <SectionDividerHeader title="Atividades Recentes" />

                        {isLoadingLoans ? (
                            <div className="space-y-4 pt-2">
                                {Array.from({ length: 5 }).map((_, idx) => (
                                    <div key={idx} className="flex items-center gap-3.5">
                                        <Skeleton className="size-10 rounded-xl" />
                                        <div className="flex-1 space-y-1.5">
                                            <Skeleton className="h-4 w-40" />
                                            <Skeleton className="h-3 w-64" />
                                        </div>
                                        <Skeleton className="h-3 w-12" />
                                    </div>
                                ))}
                            </div>
                        ) : recentActivities.length === 0 ? (
                            <div className="py-20 text-center text-sm text-muted-foreground">
                                <p>Nenhuma atividade recente registrada.</p>
                            </div>
                        ) : (
                            <div className="divide-y divide-border/60">
                                {recentActivities.map((loan) => {
                                    const isReturned = loan.status === "RETURNED"
                                    const eventDate =
                                        isReturned && loan.returnedAt
                                            ? loan.returnedAt
                                            : loan.createdAt

                                    return (
                                        <div
                                            key={loan.id}
                                            className="flex items-center justify-between gap-4 py-3.5 first:pt-1 last:pb-1"
                                        >
                                            <div className="flex min-w-0 items-center gap-3.5">
                                                <div
                                                    className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${isReturned
                                                        ? "bg-success/10 text-success"
                                                        : "bg-primary/10 text-primary"
                                                        }`}
                                                >
                                                    {isReturned ? (
                                                        <CheckCircle2 className="size-4" />
                                                    ) : (
                                                        <BookOpen className="size-4" />
                                                    )}
                                                </div>

                                                <div className="min-w-0">
                                                    <p className="truncate text-sm font-medium text-foreground">
                                                        {isReturned
                                                            ? "Devolução registrada"
                                                            : "Empréstimo registrado"}
                                                    </p>
                                                    <p className="truncate text-xs text-muted-foreground">
                                                        {isReturned
                                                            ? `${loan.itemName} devolvido por ${loan.responsibleName}`
                                                            : `${loan.itemName} emprestado para ${loan.responsibleName}`}
                                                    </p>
                                                </div>
                                            </div>

                                            <span className="shrink-0 text-xs text-muted-foreground">
                                                {formatActivityDate(eventDate)}
                                            </span>
                                        </div>
                                    )
                                })}
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Coluna Direita: Infraestrutura */}
                <Card className="rounded-2xl border-border/80 shadow-xs">
                    <CardContent className="flex flex-col gap-5 px-6 py-0.5">
                        <SectionDividerHeader title="Infraestrutura" />

                        <EquipmentStatusBlock
                            title="Ar-condicionados"
                            icon={<Wind className="size-4" />}
                            stats={acStats}
                            isLoading={isLoadingAC}
                            showPowerUsage
                            onCount={acOnCount}
                        />

                        <EquipmentStatusBlock
                            title="Projetores"
                            icon={<ProjectorIcon className="size-4" />}
                            stats={projectorStats}
                            isLoading={isLoadingProjectors}
                        />

                        {hasEquipmentAttention && (
                            <>
                                <Separator />
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                    <TriangleAlert className="size-4 shrink-0 text-warning" />
                                    <span>Equipamentos precisam de atenção</span>
                                </div>
                            </>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}