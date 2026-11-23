import type { ActionMeta, PropsValue, SingleValue } from "react-select"
import { AsyncReactSelect, type SelectOption } from "../async-react-select"
import type { LoanType } from "@/types/loan"

const loanStatusSelectOptions: { label: string; value: LoanType }[] = [
  { label: "Ativo", value: "IN_USE" },
  { label: "Em atraso", value: "LATE" },
  { label: "Devolvido", value: "RETURNED" },
]

type Props = {
  name?: string
  value?: PropsValue<SelectOption> | null
  onChange?: (newValue: SingleValue<SelectOption>, actionMeta: ActionMeta<SelectOption>) => void
  isClearable?: boolean
  placeholder?: string
  isDisabled?: boolean
}

export function LoanStatusSelect({
  name = "status",
  value,
  onChange,
  isClearable = true,
  placeholder = "Todos os status",
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
      options={loanStatusSelectOptions}
    />
  )
}
