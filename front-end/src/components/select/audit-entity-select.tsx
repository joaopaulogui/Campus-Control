import type { ActionMeta, PropsValue, SingleValue } from "react-select"
import { AsyncReactSelect, type SelectOption } from "../async-react-select"
import type { EventEntity } from "@/types/audit"

const auditEntitySelectOptions: { label: string; value: EventEntity }[] = [
  { label: "Salas", value: "ROOM" },
  { label: "Itens", value: "ITEM" },
  { label: "Empréstimos", value: "LOAN" },
  { label: "Usuários", value: "USER" },
  { label: "Blocos", value: "BUILDING" },
  { label: "Andares", value: "FLOOR" },
  { label: "Ar-condicionado", value: "AIR_CONDITIONER" },
  { label: "Projetores", value: "PROJECTOR" },
  { label: "Agendamentos", value: "SCHEDULE" },
]

type Props = {
  name?: string
  value?: PropsValue<SelectOption<EventEntity>> | null
  onChange?: (newValue: SingleValue<SelectOption<EventEntity>>, actionMeta: ActionMeta<SelectOption<EventEntity>>) => void
  isClearable?: boolean
  placeholder?: string
  isDisabled?: boolean
}

export function AuditEntitySelect({
  name = "eventEntity",
  value,
  onChange,
  isClearable = true,
  placeholder = "Todos os recursos",
  isDisabled = false,
}: Props) {
  return (
    <AsyncReactSelect
      name={name}
      placeholder={placeholder}
      value={value as PropsValue<SelectOption>}
      onChange={onChange as (newValue: SingleValue<SelectOption>, actionMeta: ActionMeta<SelectOption>) => void}
      isClearable={isClearable}
      isDisabled={isDisabled}
      options={auditEntitySelectOptions}
    />
  )
}
