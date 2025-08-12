import axios from 'axios';

// Configuration de base
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Instance Axios avec configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour les requêtes (ajouter le token automatiquement)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur pour les réponses (gestion des erreurs)
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    // Gestion des erreurs communes
    if (error.response?.status === 401) {
      // Token expiré ou invalide
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    
    // Retourner l'erreur avec un format standard
    const errorMessage = error.response?.data?.message || error.message || 'Une erreur est survenue';
    
    return Promise.reject({
      status: error.response?.status,
      message: errorMessage,
      data: error.response?.data
    });
  }
);

// Services d'authentification
export const authService = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  getMe: () => api.get('/auth/me'),
  logout: () => api.post('/auth/logout'),
};

// Services utilisateur
export const userService = {
  getProfile: () => api.get('/users/profile'),
  updateProfile: (data) => api.put('/users/profile', data),
  uploadAvatar: (file) => {
    const formData = new FormData();
    formData.append('avatar', file);
    return api.post('/users/avatar', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
};

// Services des services/prestations
export const servicesService = {
  getAll: (params = {}) => api.get('/services', { params }),
  getById: (id) => api.get(`/services/${id}`),
  getByProfessional: (professionalId) => api.get(`/services/professional/${professionalId}`),
  create: (serviceData) => api.post('/services', serviceData),
  update: (id, serviceData) => api.put(`/services/${id}`, serviceData),
  delete: (id) => api.delete(`/services/${id}`),
};

// Services de réservation
export const bookingsService = {
  getAll: (params = {}) => api.get('/bookings', { params }),
  getById: (id) => api.get(`/bookings/${id}`),
  create: (bookingData) => api.post('/bookings', bookingData),
  update: (id, data) => api.put(`/bookings/${id}`, data),
  cancel: (id, reason) => api.patch(`/bookings/${id}/cancel`, { reason }),
  confirm: (id) => api.patch(`/bookings/${id}/confirm`),
  complete: (id) => api.patch(`/bookings/${id}/complete`),
};

// Services d'avis
export const reviewsService = {
  getByProfessional: (professionalId) => api.get(`/reviews/professional/${professionalId}`),
  create: (reviewData) => api.post('/reviews', reviewData),
  update: (id, reviewData) => api.put(`/reviews/${id}`, reviewData),
  respond: (id, response) => api.patch(`/reviews/${id}/respond`, { response }),
};

// Services de conversation/messagerie
export const conversationsService = {
  getAll: () => api.get('/conversations'),
  getById: (id) => api.get(`/conversations/${id}`),
  create: (participantId, bookingId) => api.post('/conversations', { participantId, bookingId }),
  sendMessage: (conversationId, content) => api.post(`/conversations/${conversationId}/messages`, { content }),
  markAsRead: (conversationId) => api.patch(`/conversations/${conversationId}/read`),
};

// Services de paiement
export const paymentsService = {
  createPaymentIntent: (bookingData) => api.post('/payments/create-intent', bookingData),
  confirmPayment: (paymentIntentId) => api.post('/payments/confirm', { paymentIntentId }),
  refund: (transactionId, amount, reason) => api.post('/payments/refund', { transactionId, amount, reason }),
  getTransactions: () => api.get('/payments/transactions'),
};

export default api;
