import type { CreateRoomDTO, GetRoomsQueryParamsSchema, Room, RoomDetails, RoomSelectQueryParams, UpdateRoomDTO } from "@/types/room"
import { getAxiosInstance } from "@/axios/axios-config"
import type { SelectResponse } from "@/types/api"

const url = `${import.meta.env.VITE_API_URL}rooms/`

const api = getAxiosInstance()

export const room = {
  async getList(params: GetRoomsQueryParamsSchema): Promise<Room[]> {
    const { data } = await api.get(url, { params })
    return data
  },

  async getPerId(id: string): Promise<RoomDetails> {
    const { data } = await api.get(`${url}${id}`)
    return data
  },

  async toogleLock(id: string): Promise<void> {
    await api.patch(`${url}${id}/lock`)
  },

  async create(payload: CreateRoomDTO): Promise<void> {
    await api.post(url, payload)
  },

  async update(id: string, payload: UpdateRoomDTO): Promise<void> {
    await api.patch(`${url}${id}`, payload)
  },

  async delete(id: string): Promise<void> {
    await api.delete(`${url}${id}`)
  },

  async getSelectList(params: RoomSelectQueryParams): Promise<SelectResponse[]> {
    const { data } = await api.get(`${url}select`, { params })
    return data
  }
}