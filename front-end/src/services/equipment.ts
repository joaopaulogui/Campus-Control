import type { RegisterEquipmentDTO, GetEquipmentsQueryParamsSchema, AirConditioner, UpdateEquipmentStatusDTO, Projector } from "@/types/equipment"
import { getAxiosInstance } from "@/axios/axios-config"

const baseUrl = import.meta.env.VITE_API_URL
const airConditionerUrl = `${baseUrl}air-conditioners/`
const projectorUrl = `${baseUrl}projectors/`

const api = getAxiosInstance()

export const airConditioner = {
  async getList(params: GetEquipmentsQueryParamsSchema): Promise<AirConditioner[]> {
    const { data } = await api.get(airConditionerUrl, { params })
    return data
  },

  async toogle(id: string): Promise<void> {
    await api.patch(`${airConditionerUrl}${id}/toggle`)
  },

  async register(payload: RegisterEquipmentDTO): Promise<void> {
    await api.post(airConditionerUrl, payload)
  },

  async updateStatus(id: string, payload: UpdateEquipmentStatusDTO): Promise<void> {
    await api.patch(`${airConditionerUrl}${id}/status`, payload)
  },

  async delete(id: string): Promise<void> {
    await api.delete(`${airConditionerUrl}${id}`)
  },
}

export const projector = {
  async getList(params: GetEquipmentsQueryParamsSchema): Promise<Projector[]> {
    const { data } = await api.get(projectorUrl, { params })
    return data
  },

  async toogle(id: string): Promise<void> {
    await api.patch(`${projectorUrl}${id}/toggle`)
  },

  async register(payload: RegisterEquipmentDTO): Promise<void> {
    await api.post(projectorUrl, payload)
  },

  async updateStatus(id: string, payload: UpdateEquipmentStatusDTO): Promise<void> {
    await api.patch(`${projectorUrl}${id}/status`, payload)
  },

  async delete(id: string): Promise<void> {
    await api.delete(`${projectorUrl}${id}`)
  },
}
