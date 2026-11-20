import type { ActionMeta, PropsValue, SingleValue } from "react-select"
import { AsyncReactSelect, type SelectOption } from "../async-react-select"
import type { RoomType } from "@/types/room"

export const roomTypeSelectOptions: { label: string, value: RoomType }[] = [
  { label: "Sala de Aula", value: "CLASSROOM" },
  { label: "Laboratório", value: "LAB" },
  { label: "Sala de Reunião", value: "MEETING_ROOM" },
  { label: "Auditório", value: "AUDITORIUM" }
]

type Props = {
  name?: string
  value?: PropsValue<SelectOption> | null
  onChange?: (newValue: SingleValue<SelectOption>, actionMeta: ActionMeta<SelectOption>) => void
  isClearable?: boolean
  placeholder?: string
  isDisabled?: boolean
}

export function RoomTypeSelect({
  name = "type",
  value,
  onChange,
  isClearable = true,
  placeholder = "Selecione o tipo",
  isDisabled = false,
}: Props) {
  return (
    <AsyncReactSelect
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      isClearable={isClearable}
      isDisabled={isDisabled}
      options={roomTypeSelectOptions}
    />
  )
}
