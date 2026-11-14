import axios from "axios"

export function getAxiosInstance() {
    const token = localStorage.getItem("token") || ""

    const instance = axios.create({
        baseURL: import.meta.env.VITE_API_URL as string,
        headers: {
            "Authorization": `Bearer ${token}`
        },
        timeout: 10000
    })

    instance.interceptors.response.use(res => res, err => {
        if(err.response.status === 401) {
            localStorage.removeItem("token")
            window.location.href = "/login"
        }
        return Promise.reject(err)
    })

    return instance
}