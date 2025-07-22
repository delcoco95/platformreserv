// Service API REST pour remplacer Firebase
const API_BASE_URL = 'http://localhost:5000/api';

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// Utilitaires pour les appels API
const api = {
  async get<T>(endpoint: string): Promise<T> {
    const token = localStorage.getItem('auth_token');
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }
    
    const result: ApiResponse<T> = await response.json();
    if (!result.success) {
      throw new Error(result.error || 'API Error');
    }
    
    return result.data!;
  },

  async post<T>(endpoint: string, data?: any): Promise<T> {
    const token = localStorage.getItem('auth_token');
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: data ? JSON.stringify(data) : undefined,
    });
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }
    
    const result: ApiResponse<T> = await response.json();
    if (!result.success) {
      throw new Error(result.error || 'API Error');
    }
    
    return result.data!;
  },

  async put<T>(endpoint: string, data: any): Promise<T> {
    const token = localStorage.getItem('auth_token');
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }
    
    const result: ApiResponse<T> = await response.json();
    if (!result.success) {
      throw new Error(result.error || 'API Error');
    }
    
    return result.data!;
  },

  async delete<T>(endpoint: string): Promise<T> {
    const token = localStorage.getItem('auth_token');
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }
    
    const result: ApiResponse<T> = await response.json();
    if (!result.success) {
      throw new Error(result.error || 'API Error');
    }
    
    return result.data!;
  },
};

export default api;
