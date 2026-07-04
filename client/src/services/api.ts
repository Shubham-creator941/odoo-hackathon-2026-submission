import axios from 'axios'
import { toast } from 'sonner'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request Interceptor: Attach JWT tokens
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response Interceptor: Global error handlers
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || 'A network error occurred.'
    const status = error.response?.status

    if (status === 401) {
      toast.error('Session Expired', { description: 'Please log in again.' })
      localStorage.removeItem('token')
    } else if (status === 403) {
      toast.error('Access Forbidden', { description: message })
    } else if (status >= 500) {
      toast.error('Server Error', { description: 'Please try again later.' })
    }

    return Promise.reject(error)
  }
)
