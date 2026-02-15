import client from './client';

export interface VendorResponse {
  id: number;
  name: string;
  first_name?: string | null;
  last_name?: string | null;
  email?: string | null;
  phone_number?: string | null;
  created_at: string;
}

export interface VendorCreate {
  name: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  phone_number?: string;
}

export interface VendorUpdate {
  name?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  phone_number?: string;
}

export const getVendors = () => client.get<VendorResponse[]>('/vendors/');
export const getVendor = (id: number) => client.get<VendorResponse>(`/vendors/${id}`);
export const createVendor = (body: VendorCreate) => client.post<VendorResponse>('/vendors/', body);
export const updateVendor = (id: number, body: VendorUpdate) =>
  client.patch<VendorResponse>(`/vendors/${id}`, body);
export const deleteVendor = (id: number) => client.delete(`/vendors/${id}`);
