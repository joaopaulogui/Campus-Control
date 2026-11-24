import { CanAccess } from "@/components/can-access"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { AirConditioner, EquipmentStatus, Projector } from "@/types/equipment"
import type { Room } from "@/types/room"
import { Plus, ProjectorIcon, Trash, Wind } from "lucide-react"

const opcoes: { valor: EquipmentStatus; rotulo: string; cor: string }[] = [
  { valor: "WORKING", rotulo: "Funcionando", cor: "text-green-600" },
  { valor: "WARNING", rotulo: "Com defeito", cor: "text-yellow-600" },
  { valor: "BROKEN", rotulo: "Quebrado", cor: "text-red-600" },
]

interface SeletorStatusProps {
  valor: EquipmentStatus
  onMudar: (status: EquipmentStatus) => void
  desab: boolean
}

function SeletorStatus({ valor, onMudar, desab }: SeletorStatusProps) {
  const atual = opcoes.find((o) => o.valor === valor)

  return (
    <Select
      value={valor}
      disabled={desab}
      onValueChange={(v) => onMudar(v as EquipmentStatus)}
    >
      <SelectTrigger size="sm" className={`w-36 font-semibold ${atual?.cor ?? ""}`}>
        <SelectValue>{atual?.rotulo}</SelectValue>
      </SelectTrigger>
      <SelectContent>
        {opcoes.map((o) => (
          <SelectItem key={o.valor} value={o.valor} className={o.cor}>
            {o.rotulo}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

interface RoomExpandedRowProps {
  room: Room
  onAddAc: (roomId: string) => void
  onDeleteAc: (ac: AirConditioner) => void
  onToggleAc: (acId: string) => void
  isTogglingAc: boolean
  onAddProj: (roomId: string) => void
  onDeleteProj: (proj: Projector) => void
  onMudarStatusAc: (id: string, status: EquipmentStatus) => void
  onMudarStatusProj: (id: string, status: EquipmentStatus) => void
  mudandoStatus: boolean
}

export default function RoomExpandedRow({
  room,
  onAddAc,
  onDeleteAc,
  onToggleAc,
  isTogglingAc,
  onAddProj,
  onDeleteProj,
  onMudarStatusAc,
  onMudarStatusProj,
  mudandoStatus,
}: RoomExpandedRowProps) {
  const airConditioners = room.airConditioners ?? []
  const projectors = room.projectors ?? []

  return (
    <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 bg-muted/20">
      {/* Card AR-CONDICIONADO */}
      <div className="rounded-2xl border border-border/70 bg-card p-5 shadow-xs">
        <div className="flex items-center justify-between border-b border-border/40 pb-3 mb-4">
          <div className="flex justify-center items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
            <Wind className="size-4 text-primary" />
            Ar-condicionados
          </div>

          <CanAccess allowedRoles={["ADMIN"]}>
            <Button
              variant="secondary"
              size="icon-sm"
              onClick={() => onAddAc(room.id)}
            >
              <Plus />
            </Button>
          </CanAccess>
        </div>

        <div className="flex flex-col gap-3">
          {airConditioners.length > 0 ? (
            airConditioners.map((ac) => (
              <div key={ac.id} className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <Switch
                    checked={ac.isOn}
                    disabled={isTogglingAc}
                    aria-label={`Ligar ou desligar ar-condicionado ${ac.id}`}
                    onCheckedChange={() => onToggleAc(ac.id)}
                  />

                  <p className="text-muted-foreground font-semibold">
                    AC-{ac.id.slice(0, 4).toUpperCase()}
                  </p>

                  <SeletorStatus
                    valor={ac.status}
                    desab={mudandoStatus}
                    onMudar={(s) => onMudarStatusAc(ac.id, s)}
                  />
                </div>

                <CanAccess allowedRoles={["ADMIN"]}>
                  <Button
                    variant="destructive"
                    size="icon-sm"
                    onClick={() => onDeleteAc(ac)}
                  >
                    <Trash />
                  </Button>
                </CanAccess>
              </div>
            ))
          ) : (
            <p className="py-4 text-center text-xs text-muted-foreground">
              Nenhum ar-condicionado vinculado a esta sala.
            </p>
          )}
        </div>
      </div>

      {/* Card PROJETOR */}
      <div className="rounded-2xl border border-border/70 bg-card p-5 shadow-xs">
        <div className="flex items-center justify-between border-b border-border/40 pb-3 mb-4">
          <div className="justify-center flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
            <ProjectorIcon className="size-4 text-primary" />
            Projetores
          </div>

          <CanAccess allowedRoles={["ADMIN"]}>
            <Button
              variant="secondary"
              size="icon-sm"
              onClick={() => onAddProj(room.id)}
            >
              <Plus />
            </Button>
          </CanAccess>
        </div>

        <div className="flex flex-col gap-3">
          {projectors.length > 0 ? (
            projectors.map((proj) => (
              <div key={proj.id} className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <p className="text-muted-foreground font-semibold">
                    PROJ-{proj.id.slice(0, 4).toUpperCase()}
                  </p>

                  <SeletorStatus
                    valor={proj.status}
                    desab={mudandoStatus}
                    onMudar={(s) => onMudarStatusProj(proj.id, s)}
                  />
                </div>

                <CanAccess allowedRoles={["ADMIN"]}>
                  <Button
                    variant="destructive"
                    size="icon-sm"
                    onClick={() => onDeleteProj(proj)}
                  >
                    <Trash />
                  </Button>
                </CanAccess>
              </div>
            ))
          ) : (
            <p className="py-4 text-center text-xs text-muted-foreground">
              Nenhum projetor vinculado a esta sala.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}