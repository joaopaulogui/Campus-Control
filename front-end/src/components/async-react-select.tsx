import type { GroupBase, StylesConfig } from 'node_modules/react-select/dist/declarations/src';
import AsyncSelect, { type AsyncProps } from 'react-select/async';
import { useTheme } from './theme-provider';
import React from 'react';

export const shadcnLight = {
  background: "rgb(255 255 255)",
  foreground: "rgb(33 33 33)",

  popover: "rgb(255 255 255)",
  popoverForeground: "rgb(33 33 33)",

  muted: "rgb(245 245 245)",
  mutedForeground: "rgb(127 127 127)",

  accent: "rgb(245 245 245)",
  accentForeground: "rgb(53 53 53)",

  border: "rgb(235 235 235)",
  input: "rgb(235 235 235)",
  ring: "rgb(180 180 180)",
}

export const shadcnDark = {
  background: "rgb(20 20 20)",
  foreground: "rgb(250 250 250)",

  popover: "rgb(53 53 53)",
  popoverForeground: "rgb(250 250 250)",

  muted: "rgb(69 69 69)",
  mutedForeground: "rgb(180 180 180)",

  accent: "rgb(69 69 69)",
  accentForeground: "rgb(250 250 250)",

  border: "rgb(255 255 255 / .1)",
  input: "rgb(255 255 255 / .15)",
  ring: "rgb(127 127 127)",
}

export function getPalette(theme: "light" | "dark") {
  return theme === "dark" ? shadcnDark : shadcnLight
}

function resolveTheme(theme: "light" | "dark" | "system"): "light" | "dark" {
  if (theme === "system") {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light"
  }
  return theme
}

export const makeShadcnSelectStyles = (palette: typeof shadcnLight): StylesConfig<any, boolean> => ({
  control: (b, s) => ({
    ...b,
    backgroundColor: palette.background,
    border: `1px solid ${palette.border}`,
    borderRadius: "0.6rem",
    minHeight: "2.25rem",
    boxShadow: s.isFocused
      ? `0 0 0 3px ${palette.ring}`
      : "0 1px 2px rgb(0 0 0 / .05)",
    paddingInline: "0.5rem",
  }),

  placeholder: (b) => ({ ...b, color: palette.mutedForeground, fontSize: "0.875rem" }),
  singleValue: (b) => ({ ...b, color: palette.foreground, fontSize: "0.875rem" }),
  input: (b) => ({ ...b, color: palette.foreground, fontSize: "0.875rem" }),

  menu: (b) => ({
    ...b,
    backgroundColor: palette.popover,
    color: palette.popoverForeground,
    border: `1px solid ${palette.border}`,
    borderRadius: "0.375rem",
    padding: "0.25rem",
    marginTop: "0.25rem",
    zIndex: 50,
    fontSize: "0.8rem"
  }),

  option: (b, s) => ({
    ...b,
    backgroundColor: s.isFocused ? palette.accent : "transparent",
    color: s.isSelected ? palette.accentForeground : palette.foreground,
    borderRadius: "0.25rem",
  }),

  indicatorSeparator: () => ({ display: "none" }),
})

export type SelectOption = {
  label: string,
  value: number | string
}

type MyAsyncSelectProps<
  TOption = SelectOption,
  IsMulti extends boolean = false,
  Group extends GroupBase<TOption> = GroupBase<TOption>
> = AsyncProps<TOption, IsMulti, Group> & {
  label?: string
  error?: string
  options?: SelectOption[]
  asyncFunction?: (inputValue: string) => Promise<SelectOption[]>
}

export function AsyncReactSelect({ options = [], asyncFunction, ...rest }: MyAsyncSelectProps) {

  const { theme } = useTheme()
  const palette = getPalette(resolveTheme(theme))

  const styles = React.useMemo(
    () => makeShadcnSelectStyles(palette),
    [palette]
  )

  const filterOptions = (inputValue: string) => {
    return options.filter((i) =>
      i.label ? i.label.toLowerCase().includes(inputValue.toLowerCase()) : false
    );
  };

  const loadOptions = (
    inputValue: string,
    callback: (options: (SelectOption | GroupBase<SelectOption>)[]) => void
  ) => {
    setTimeout(() => {
      if (asyncFunction)
        asyncFunction(inputValue).then(
          (options) => callback(options)
        );
      else
        callback(filterOptions(inputValue));
    }, 1000);
  };

  return (
    <AsyncSelect
      cacheOptions={false}
      loadOptions={loadOptions}
      defaultOptions
      noOptionsMessage={() => "Nenhuma opção encontrada"}
      styles={styles}
      {...rest} />
  );
}