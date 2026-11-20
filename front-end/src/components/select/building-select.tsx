import type { ActionMeta, PropsValue, SingleValue } from "react-select"
import { AsyncReactSelect, type SelectOption } from "../async-react-select"
import { building } from "@/services/building"

type Props = {
  value?: PropsValue<SelectOption> | null
  onChange?: (newValue: SingleValue<SelectOption>, actionMeta: ActionMeta<SelectOption>) => void
  isClearable?: boolean
  placeholder?: string
  isDisabled?: boolean
}

export function BuildingSelect({
  value,
  onChange,
  isClearable = true,
  placeholder = "Todos os blocos",
  isDisabled = false,
}: Props) {
  return (
    <AsyncReactSelect
      name="buildingId"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      isClearable={isClearable}
      isDisabled={isDisabled}
      asyncFunction={async (inputValue: string) => {
        try {
          const items = (await building.getSelectList({
            name: inputValue || undefined,
          })) as unknown as Array<{ id: string; name: string }>

          const list = Array.isArray(items) ? items : []
          return list.map((item) => ({
            label: item.name,
            value: item.id,
          }))
        } catch {
          return []
        }
      }}
    />
  )
}
