import { AxiosError } from "axios"

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

export function capitalizeWords(str: string) {
  return str
    .toLowerCase()
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

export function errorMsg(error: any, fallback = "Erro interno") {
  const messageArray: string[] = []
  
  if(error?.response?.data?.errors) {
    const errors = error?.response?.data?.errors
    Object.entries(errors).map(([_, value]) => {
      // console.log(key, value)
      //@ts-ignore
      if(value && value[0]?._errors) messageArray.push([...value[0]?._errors])
      //@ts-ignore
      if(value && value._errors) messageArray.push([...value._errors])
    })
    if(messageArray && messageArray.length > 0) return messageArray.join(" • ")
  }
  
  if (!(error instanceof AxiosError)) return fallback

  const data = error.response?.data
  if (!data) return fallback

  // Erro geral
  if (typeof data.message === "string") return data.message

  return fallback
}


export function formatDate(s?: string | null) {
  if (!s) return ""
  const date = new Date(s)
  return date.toLocaleDateString("pt-BR")
}

export function formatCellphone(c: string) {
  if (!c) return "";
  const l = c.length;
  if (l <= 2) return c.replace(/(\d)/, '($1');
  if (l > 2 && l <= 6) return c.replace(/(\d{2})(\d)/, '($1) $2');
  if (l > 6 && l <= 10) return c.replace(/(\d{2})(\d{4})(\d)/, '($1) $2-$3');
  if (l === 11) return c.replace(/(\d{2})(\d{5})(\d)/, '($1) $2-$3');
  return c
}

export function currency(value?: number | string | null) {
  const zero = 0;
  const valueZero = zero.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  const numVal = Number(value);

  if (isNaN(numVal)) return valueZero;
  if (value) return numVal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  else return valueZero;
}

export function unmask(value: string | null | undefined) {
  if (!value) return ""
  return value.replace(/\D/g, "")
}