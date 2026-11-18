import type { CreateUserDTO, LoginDTO, LoginResponse, UpdateUserDTO, User } from "@/types/user"
import { getAxiosInstance } from "@/axios/axios-config"
import type { SelectQueryParams, SelectResponse } from "@/types/api"

const url = `${import.meta.env.VITE_API_URL}users/`

const api = getAxiosInstance()

export const user = {
    async login(payload: LoginDTO): Promise<LoginResponse> {
        const { data } = await api.post<LoginResponse>(`${url}login`, payload)
        return data
    },

    async getMe(): Promise<User> {
        const { data } = await api.get<User>(`${url}me`)
        return data
    },

    async create(payload: CreateUserDTO): Promise<void> {
        await api.post(url, { payload })
    },

    async update(id: number, payload: UpdateUserDTO): Promise<void> {
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