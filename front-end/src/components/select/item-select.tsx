import type { ActionMeta, PropsValue, SingleValue } from "react-select"
import { AsyncReactSelect, type SelectOption } from "../async-react-select"
import { item } from "@/services/item"

type Props = {
  name?: string
  value?: PropsValue<SelectOption> | null
  onChange?: (newValue: SingleValue<SelectOption>, actionMeta: ActionMeta<SelectOption>) => void
  isClearable?: boolean
  placeholder?: string
  isDisabled?: boolean
}

export function ItemSelect({
  name = "itemId",
  value,
  onChange,
  isClearable = true,
  placeholder = "Selecione o item",
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
      asyncFunction={async (inputValue: string) => {
        try {
          const items = (await item.getSelectList({
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
