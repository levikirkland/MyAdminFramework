export interface User {
  id: number
  name: string
  email: string
  role: string
  status: 'Active' | 'Inactive' | 'Pending'
  lastActive: string
}

const MOCK_USERS: User[] = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  role: i % 3 === 0 ? 'Admin' : i % 3 === 1 ? 'Editor' : 'Viewer',
  status: i % 4 === 0 ? 'Inactive' : i % 5 === 0 ? 'Pending' : 'Active',
  lastActive: `${Math.floor(Math.random() * 24)} hours ago`
}))

export interface FetchUsersParams {
  page: number
  perPage: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
  search?: string
}

export interface FetchUsersResponse {
  data: User[]
  total: number
}

export const mockApi = {
  fetchUsers: async (params: FetchUsersParams): Promise<FetchUsersResponse> => {
    console.log('Fetching users with params:', params)
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800))

    let filtered = [...MOCK_USERS]

    // Server-side filtering
    if (params.search) {
      const query = params.search.toLowerCase()
      filtered = filtered.filter(user => 
        user.name.toLowerCase().includes(query) || 
        user.email.toLowerCase().includes(query) ||
        user.role.toLowerCase().includes(query) ||
        user.status.toLowerCase().includes(query)
      )
    }

    // Server-side sorting
    if (params.sortBy && params.sortOrder) {
      filtered.sort((a, b) => {
        const valA = a[params.sortBy as keyof User]
        const valB = b[params.sortBy as keyof User]
        if (valA < valB) return params.sortOrder === 'asc' ? -1 : 1
        if (valA > valB) return params.sortOrder === 'asc' ? 1 : -1
        return 0
      })
    }

    // Server-side pagination
    const start = (params.page - 1) * params.perPage
    const end = start + params.perPage
    const paginated = filtered.slice(start, end)

    return {
      data: paginated,
      total: filtered.length
    }
  }
}
