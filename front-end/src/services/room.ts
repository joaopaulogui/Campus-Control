import type { CreateRoomDTO, GetRoomsQueryParamsSchema, Room, RoomDetails, UpdateRoomDTO } from "@/types/room"
import { getAxiosInstance } from "@/axios/axios-config"
import type { SelectQueryParams, SelectResponse } from "@/types/api"

const url = `${import.meta.env.VITE_API_URL}rooms/`

const api = getAxiosInstance()

export const room = {
  async getList(params: GetRoomsQueryParamsSchema): Promise<Room[]> {
    const { data } = await api.get(url, { params })
    return data
  },

  async getPerId(id: number): Promise<RoomDetails> {
    const { data } = await api.get(`${url}/${id}`)
    return data
  },

  async toogleLock(id: number): Promise<void> {
    await api.patch(`${url}/${id}/lock`)
  },

  async create(payload: CreateRoomDTO): Promise<void> {
    await api.post(url, { payload })
  },

  async update(id: number, payload: UpdateRoomDTO): Promise<void> {
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