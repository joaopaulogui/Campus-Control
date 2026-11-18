import type { CreateItemDTO, GetItemsQueryParamsSchema, Item } from "@/types/item"
import { getAxiosInstance } from "@/axios/axios-config"
import type { SelectQueryParams, SelectResponse } from "@/types/api"

const url = `${import.meta.env.VITE_API_URL}items/`

const api = getAxiosInstance()

export const item = {
  async getList(params: GetItemsQueryParamsSchema): Promise<Item[]> {
    const { data } = await api.get(url, { params })
    return data
  },

  async create(payload: CreateItemDTO): Promise<void> {
    await api.post(url, { payload })
  },

  async delete(id: number): Promise<void> {
    await api.delete(`${url}/${id}`)
  },

  async getSelectList(params: SelectQueryParams): Promise<SelectResponse> {
    const { data } = await api.get(`${url}select`, { params })
    return data
  }
}