import client from './client';

export interface HealthResponse {
  app: string;
  status: string;
  database: string;
}

export interface PingResponse {
  status: string;
}

export const getHealth = () => client.get<HealthResponse>('/health/');
export const getPing = () => client.get<PingResponse>('/ping/');
