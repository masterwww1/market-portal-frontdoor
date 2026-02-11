import client from './client';

export interface VendorResponse {
  id: number;
  name: string;
  created_at: string;
}

export interface VendorCreate {
  name: string;
}

export interface VendorUpdate {
  name?: string;
}

export const getVendors = () => client.get<VendorResponse[]>('/vendors/');
export const getVendor = (id: number) => client.get<VendorResponse>(`/vendors/${id}`);
export const createVendor = (body: VendorCreate) => client.post<VendorResponse>('/vendors/', body);
export const updateVendor = (id: number, body: VendorUpdate) =>
  client.patch<VendorResponse>(`/vendors/${id}`, body);
export const deleteVendor = (id: number) => client.delete(`/vendors/${id}`);
