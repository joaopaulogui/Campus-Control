import axios from "axios"

export function getAxiosInstance() {
    const instance = axios.create({
        baseURL: import.meta.env.VITE_API_URL as string,
        timeout: 10000
    })

    instance.interceptors.request.use((config) => {
        const token = localStorage.getItem("token")
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    })

    instance.interceptors.response.use(
        (res) => res,
        (err) => {
            if (err.response?.status === 401) {
                localStorage.removeItem("token")
                window.location.href = "/login"
            }
            return Promise.reject(err)
        }
    )

    return instance
}