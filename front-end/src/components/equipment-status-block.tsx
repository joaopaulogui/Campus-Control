import type { summarizeEquipmentStatus } from "@/utils/equipment"
import { Skeleton } from "./ui/skeleton"

interface EquipmentStatusBlockProps {
  title: string
  icon: React.ReactNode
  stats: ReturnType<typeof summarizeEquipmentStatus>
  isLoading?: boolean
  showPowerUsage?: boolean
  onCount?: number
}

export default function EquipmentStatusBlock({
  title,
  icon,
  stats,
  isLoading,
  showPowerUsage = false,
  onCount = 0,
}: EquipmentStatusBlockProps) {
  const onPct = stats.total > 0 ? (onCount / stats.total) * 100 : 0

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
        <span className="text-muted-foreground">{icon}</span>
        <span>{title}</span>
      </div>

      {isLoading ? (
        <div className="space-y-2">
          <Skeleton className="h-2 w-full rounded-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      ) : (
        <>
          {/* Barra segmentada de saúde do equipamento */}
          <div className="flex h-2 w-full gap-0.5 overflow-hidden rounded-full bg-muted">
            {stats.brokenPct > 0 && (
              <div
                style={{ width: `${stats.brokenPct}%` }}
                className="h-full bg-destructive transition-all"
              />
            )}
            {stats.warningPct > 0 && (
              <div
                style={{ width: `${stats.warningPct}%` }}
                className="h-full bg-warning transition-all"
              />
            )}
            {stats.workingPct > 0 && (
              <div
                style={{ width: `${stats.workingPct}%` }}
                className="h-full bg-success transition-all"
              />
            )}
          </div>

          {/* Legenda de status */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-medium">
            <span className="text-destructive">
              {stats.broken} {stats.broken === 1 ? "quebrado" : "quebrados"}
            </span>
            <span className="text-warning">{stats.warning} c/ defeito</span>
            <span className="text-success">{stats.working} funcionando</span>
          </div>

          {/* Barra de equipamentos ligados agora (Ar-condicionados) */}
          {showPowerUsage && (
            <div className="space-y-1.5 pt-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Ligados agora</span>
                <span className="font-semibold text-foreground">
                  {onCount} de {stats.total}
                </span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                <div
                  style={{ width: `${onPct}%` }}
                  className="h-full rounded-full bg-primary transition-all"
                />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}