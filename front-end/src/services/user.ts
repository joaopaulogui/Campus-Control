import type { LoginDTO, LoginResponse, User } from "@/types/user"
import { getAxiosInstance } from "@/axios/axios-config"

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
    }
}