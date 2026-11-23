import type { GetAuditsQueryParamsSchema, Audit } from "@/types/audit"
import { getAxiosInstance } from "@/axios/axios-config"
import type { PaginationQueryParams } from "@/types/api"

const url = `${import.meta.env.VITE_API_URL}audits/`

const api = getAxiosInstance()

export const audit = {
  async getList(params: GetAuditsQueryParamsSchema): Promise<Audit[]> {
    const { data } = await api.get(url, { params })
    return data
  },

  async getRecentActivities(params: PaginationQueryParams): Promise<Audit[]> {
    const { data } = await api.get(`${url}recent-activities`, { params })
    return data
  }
}
