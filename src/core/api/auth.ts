import axios from 'axios';

const AUTH_BASE_URL = import.meta.env.VITE_AUTH_API_URL || '/api/auth';

const authClient = axios.create({
  baseURL: AUTH_BASE_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
  user: {
    id: number;
    email: string;
  };
}

export interface RefreshTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

export interface VerifyTokenResponse {
  valid: boolean;
  user: {
    id: number;
    email: string;
  };
  payload: {
    sub: string;
    user_id: number;
    source: string;
  };
}

export const login = async (credentials: LoginRequest) => {
  const response = await authClient.post<LoginResponse>('/login', credentials);
  return response.data;
};

export const refreshToken = async (refreshToken: string) => {
  const response = await authClient.post<RefreshTokenResponse>('/refresh', {
    refresh_token: refreshToken,
  });
  return response.data;
};

export const verifyToken = async (token: string) => {
  const response = await authClient.post<VerifyTokenResponse>('/verify', {
    token,
  });
  return response.data;
};
