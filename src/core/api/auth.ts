import client from './client';

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
    vendor_id?: number;
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
    vendor_id?: number;
  };
  payload: {
    sub: string;
    user_id: number;
    source: string;
  };
}

export const login = async (credentials: LoginRequest) => {
  const response = await client.post<LoginResponse>('/auth/login', credentials);
  return response.data;
};

export const refreshToken = async (refreshToken: string) => {
  const response = await client.post<RefreshTokenResponse>('/auth/refresh', {
    refresh_token: refreshToken,
  });
  return response.data;
};

export const verifyToken = async (token: string) => {
  const response = await client.post<VerifyTokenResponse>('/auth/verify', {
    token,
  });
  return response.data;
};
