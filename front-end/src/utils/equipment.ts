import type { EquipmentStatus } from "@/types/room"

export interface EquipmentStatusSummary {
  total: number
  broken: number
  warning: number
  working: number
  brokenPct: number
  warningPct: number
  workingPct: number
}

export function summarizeEquipmentStatus<T extends { status: EquipmentStatus }>(
  list: T[]
): EquipmentStatusSummary {
  const total = list.length
  const broken = list.filter((e) => e.status === "BROKEN").length
  const warning = list.filter((e) => e.status === "WARNING").length
  const working = list.filter((e) => e.status === "WORKING").length

  return {
    total,
    broken,
    warning,
    working,
    brokenPct: total > 0 ? (broken / total) * 100 : 0,
    warningPct: total > 0 ? (warning / total) * 100 : 0,
    workingPct: total > 0 ? (working / total) * 100 : 0,
  }
}