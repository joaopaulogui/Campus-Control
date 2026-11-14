import axios from "axios"
import type { LoginDTO, LoginResponse } from "@/types/user"

const url = `${import.meta.env.VITE_API_URL}users/`

export const user = {
    async login(data: LoginDTO) {
        const response = await axios.post(`${url}login`, data)
        return response.data as LoginResponse
    }
}