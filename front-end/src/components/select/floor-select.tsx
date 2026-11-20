import type { ActionMeta, PropsValue, SingleValue } from "react-select"
import { AsyncReactSelect, type SelectOption } from "../async-react-select"
import { floor } from "@/services/floor"
import { useEffect } from "react"

type Props = {
  value?: PropsValue<SelectOption> | null
  onChange?: (newValue: SingleValue<SelectOption>, actionMeta: ActionMeta<SelectOption>) => void
  isClearable?: boolean
  buildingId?: string
  placeholder?: string
  isDisabled?: boolean
}

export function FloorSelect({
  value,
  onChange,
  buildingId,
  isClearable = true,
  placeholder = "Todos os andares",
  isDisabled = false,
}: Props) {
  
  useEffect(() => {
    if (buildingId !== undefined) {
      // @ts-expect-error react-select clear action
      onChange?.(null, { action: "clear" })
    }
  }, [buildingId, onChange])

  return (
    <AsyncReactSelect
      key={buildingId ?? "all-floors"}
      name="floorId"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      isClearable={isClearable}
      isDisabled={isDisabled}
      asyncFunction={async (inputValue: string) => {
        try {
          const items = (await floor.getSelectList({
            name: inputValue || undefined,
            buildingId: buildingId || undefined,
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
