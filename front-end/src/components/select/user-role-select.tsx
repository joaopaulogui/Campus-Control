import type { ActionMeta, PropsValue, SingleValue } from "react-select"
import { AsyncReactSelect, type SelectOption } from "../async-react-select"
import type { UserRole } from "@/types/user"

const userRoleSelectOptions: { label: string; value: UserRole }[] = [
  { label: "Administrador", value: "ADMIN" },
  { label: "Membro", value: "MEMBER" },
]

type Props = {
  name?: string
  value?: PropsValue<SelectOption<UserRole>> | null
  onChange?: (newValue: SingleValue<SelectOption<UserRole>>, actionMeta: ActionMeta<SelectOption<UserRole>>) => void
  isClearable?: boolean
  placeholder?: string
  isDisabled?: boolean
}

export function UserRoleSelect({
  name = "role",
  value,
  onChange,
  isClearable = true,
  placeholder = "Todos os perfis",
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
      options={userRoleSelectOptions}
    />
  )
}
