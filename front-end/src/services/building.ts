import type { Building, CreateBuildingDTO, GetBuildingsQueryParamsSchema, UpdateBuildingDTO } from "@/types/building"
import { getAxiosInstance } from "@/axios/axios-config"
import type { SelectQueryParams, SelectResponse } from "@/types/api"

const url = `${import.meta.env.VITE_API_URL}buildings/`

const api = getAxiosInstance()

export const building = {
  async getList(params: GetBuildingsQueryParamsSchema): Promise<Building[]> {
    const { data } = await api.get(url, { params })
    return data
  },

  async create(payload: CreateBuildingDTO): Promise<void> {
    await api.post(url, { payload })
  },

  async update(id: number, payload: UpdateBuildingDTO): Promise<void> {
    await api.patch(`${url}/${id}`, { payload })
  },

  async delete(id: number): Promise<void> {
    await api.delete(`${url}/${id}`)
  },

  async getSelectList(params: SelectQueryParams): Promise<SelectResponse> {
    const { data } = await api.get(`${url}select`, { params })
    return data
  }
}