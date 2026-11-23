import type { ActionMeta, PropsValue, SingleValue } from "react-select"
import { AsyncReactSelect, type SelectOption } from "../async-react-select"

export const roomStatusSelectOptions = [
  { label: "Aberta", value: false },
  { label: "Fechada", value: true }
]

type Props = {
  name?: string
  value?: PropsValue<SelectOption> | null
  onChange?: (newValue: SingleValue<SelectOption>, actionMeta: ActionMeta<SelectOption>) => void
  isClearable?: boolean
  placeholder?: string
  isDisabled?: boolean
}

export function RoomStatusSelect({
  name = "isLocked",
  value,
  onChange,
  isClearable = true,
  placeholder = "Selecione o status",
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
      options={roomStatusSelectOptions}
    />
  )
}
