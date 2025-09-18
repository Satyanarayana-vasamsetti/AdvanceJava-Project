import axios from 'axios';
import { AuthRequest, AuthResponse, RegisterRequest } from '@/types/auth';
import { Lead, LeadPageResponse, LeadStats, LeadStatus } from '@/types/lead';

const API_BASE_URL = import.meta.env.VITE_API_URL as string;

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authAPI = {
  login: async (credentials: AuthRequest): Promise<AuthResponse> => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  register: async (userData: RegisterRequest): Promise<AuthResponse> => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },
};

// Leads API
export const leadsAPI = {
  createLead: async (lead: Lead): Promise<Lead> => {
    const response = await api.post('/leads/createLead', lead);
    return response.data;
  },

  getAllLeads: async (
    page: number = 0,
    size: number = 10,
    sortBy: string = 'customerid',
    direction: string = 'asc'
  ): Promise<LeadPageResponse> => {
    const response = await api.get('/leads/getAllLeads', {
      params: { page, size, sortBy, direction },
    });
    return response.data;
  },

  getLeadById: async (id: number): Promise<Lead> => {
    const response = await api.get(`/leads/id/${id}`);
    return response.data;
  },

  updateLead: async (lead: Lead): Promise<Lead> => {
    const response = await api.put('/leads/updateLead', lead);
    return response.data;
  },

  countAllLeads: async (): Promise<number> => {
    const response = await api.get('/leads/users/count');
    return response.data;
  },

  getLeadsByStatus: async (status: LeadStatus): Promise<LeadStats> => {
    const response = await api.get(`/leads/${status}/leadStatus`);
    return response.data;
  },
};

export default api;