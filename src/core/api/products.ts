import client from './client';

export interface ProductResponse {
  id: number;
  name: string;
  sku?: string | null;
  description?: string | null;
  price: number;
  vendor_id: number;
  vendor_name?: string | null;
  created_at: string;
}

export interface ProductCreate {
  name: string;
  sku?: string;
  description?: string;
  price: number;
}

export interface ProductUpdate {
  name?: string;
  sku?: string;
  description?: string;
  price?: number;
  vendor_id?: number;
}

export const getProducts = (params?: { vendor_id?: number }) =>
  client.get<ProductResponse[]>('/products/', { params });
export const getProduct = (id: number) => client.get<ProductResponse>(`/products/${id}`);
export const createProduct = (body: ProductCreate) =>
  client.post<ProductResponse>('/products/', body);
export const updateProduct = (id: number, body: ProductUpdate) =>
  client.patch<ProductResponse>(`/products/${id}`, body);
export const deleteProduct = (id: number) => client.delete(`/products/${id}`);
