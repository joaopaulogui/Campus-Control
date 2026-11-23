import type { ActionMeta, MultiValue } from "react-select"
import { AsyncReactSelect, type SelectOption } from "../async-react-select"
import { building } from "@/services/building"

type Props = {
  name?: string
  value?: readonly SelectOption[]
  onChange?: (newValue: MultiValue<SelectOption>, actionMeta: ActionMeta<SelectOption>) => void
  placeholder?: string
  isDisabled?: boolean
}


export function BuildingsMultiSelect({
  name = "buildings",
  value,
  onChange,
  placeholder = "Selecione os blocos vinculados...",
  isDisabled = false,
}: Props) {
  return (
    <AsyncReactSelect<true>
      isMulti
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
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

