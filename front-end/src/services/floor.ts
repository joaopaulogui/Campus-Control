import type { CreateFloorDTO, GetFloorsQueryParamsSchema, Floor, UpdateFloorDTO, FloorSelectQueryParams } from "@/types/floor"
import { getAxiosInstance } from "@/axios/axios-config"
import type { SelectResponse } from "@/types/api"

const url = `${import.meta.env.VITE_API_URL}floors/`

const api = getAxiosInstance()

export const floor = {
  async getList(params: GetFloorsQueryParamsSchema): Promise<Floor[]> {
    const { data } = await api.get(url, { params })
    return data
  },

  async create(payload: CreateFloorDTO): Promise<void> {
    await api.post(url, payload)
  },

  async update(id: string, payload: UpdateFloorDTO): Promise<void> {
    await api.patch(`${url}${id}`, payload)
  },

  async delete(id: string): Promise<void> {
    await api.delete(`${url}${id}`)
  },

  async getSelectList(params: FloorSelectQueryParams): Promise<SelectResponse[]> {
    const { data } = await api.get(`${url}select`, { params })
    return data
  }
}