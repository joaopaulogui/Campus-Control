import type { CreateUserDTO, GetUsersQueryParamsSchema, LoginDTO, LoginResponse, UpdateUserDTO, User, UserWithBuildingIds } from "@/types/user"
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

    async getList(params?: GetUsersQueryParamsSchema): Promise<User[]> {
        const { data } = await api.get<User[]>(url, { params })
        return data
    },

    async getById(id: string): Promise<UserWithBuildingIds> {
        const { data } = await api.get<UserWithBuildingIds>(`${url}${id}`)
        return data
    },

    async create(payload: CreateUserDTO): Promise<void> {
        await api.post(url, payload)
    },

    async update(id: string, payload: UpdateUserDTO): Promise<void> {
        await api.patch(`${url}${id}`, payload)
    },

    async delete(id: string): Promise<void> {
        await api.delete(`${url}${id}`)
    },

    async getSelectList(params: SelectQueryParams): Promise<SelectResponse[]> {
        const { data } = await api.get(`${url}select`, { params })
        return data
    }
}
