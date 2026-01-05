import { useToast } from '../composables/useToast'

interface RequestOptions extends RequestInit {
  params?: Record<string, string | number | boolean>
  skipErrorHandling?: boolean
}

class ApiClient {
  private baseUrl: string
  private getToken: () => string | null

  constructor(baseUrl: string = '', getToken: () => string | null = () => localStorage.getItem('auth_token')) {
    this.baseUrl = baseUrl
    this.getToken = getToken
  }

  private async request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const { params, skipErrorHandling, ...fetchOptions } = options
    const { showToast } = useToast()

    // Build URL with params
    let url = `${this.baseUrl}${endpoint}`
    if (params) {
      const searchParams = new URLSearchParams()
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          searchParams.append(key, String(value))
        }
      })
      const separator = url.includes('?') ? '&' : '?'
      url += `${separator}${searchParams.toString()}`
    }

    // Add headers
    const headers = new Headers(fetchOptions.headers)
    const token = this.getToken()
    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }
    if (!headers.has('Content-Type') && !(fetchOptions.body instanceof FormData)) {
      headers.set('Content-Type', 'application/json')
    }

    try {
      const response = await fetch(url, {
        ...fetchOptions,
        headers
      })

      if (!response.ok) {
        // Handle 401 Unauthorized
        if (response.status === 401) {
          // Optional: Redirect to login or emit event
          window.dispatchEvent(new CustomEvent('api:unauthorized'))
        }

        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `HTTP Error ${response.status}`)
      }

      // Handle 204 No Content
      if (response.status === 204) {
        return null as T
      }

      return await response.json()
    } catch (error: any) {
      if (!skipErrorHandling) {
        showToast(error.message || 'An unexpected error occurred', 'error')
      }
      throw error
    }
  }

  get<T>(endpoint: string, params?: Record<string, any>, options?: RequestOptions) {
    return this.request<T>(endpoint, { ...options, method: 'GET', params })
  }

  post<T>(endpoint: string, body?: any, options?: RequestOptions) {
    return this.request<T>(endpoint, { 
      ...options, 
      method: 'POST', 
      body: JSON.stringify(body) 
    })
  }

  put<T>(endpoint: string, body?: any, options?: RequestOptions) {
    return this.request<T>(endpoint, { 
      ...options, 
      method: 'PUT', 
      body: JSON.stringify(body) 
    })
  }

  delete<T>(endpoint: string, options?: RequestOptions) {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' })
  }
}

export const createApiClient = (baseUrl?: string) => new ApiClient(baseUrl)
