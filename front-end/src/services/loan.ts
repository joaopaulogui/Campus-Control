import type { CreateLoanDTO, GetLoansQueryParamsSchema, Loan } from "@/types/loan"
import { getAxiosInstance } from "@/axios/axios-config"
import type { SelectQueryParams, SelectResponse } from "@/types/api"

const url = `${import.meta.env.VITE_API_URL}loans/`

const api = getAxiosInstance()

export const loan = {
  async getList(params: GetLoansQueryParamsSchema): Promise<Loan[]> {
    const { data } = await api.get(url, { params })
    return data
  },

  async create(payload: CreateLoanDTO): Promise<void> {
    await api.post(url, { payload })
  },

  async return(id: number): Promise<void> {
    await api.patch(`${url}/${id}/return`)
  },

  async getSelectList(params: SelectQueryParams): Promise<SelectResponse> {
    const { data } = await api.get(`${url}select`, { params })
    return data
  }
}