import type { ActionMeta, PropsValue, SingleValue } from "react-select"
import { AsyncReactSelect, type SelectOption } from "../async-react-select"
import type { ItemType } from "@/types/item"

export const itemTypeSelectOptions: { label: string, value: ItemType }[] = [
  { label: "Equipamento", value: "EQUIPMENT" },
  { label: "Estacionário", value: "STATIONARY" },
  { label: "Outro", value: "OTHER" }
]

type Props = {
  name?: string
  value?: PropsValue<SelectOption> | null
  onChange?: (newValue: SingleValue<SelectOption>, actionMeta: ActionMeta<SelectOption>) => void
  isClearable?: boolean
  placeholder?: string
  isDisabled?: boolean
}

export function ItemTypeSelect({
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
      options={itemTypeSelectOptions}
    />
  )
}
