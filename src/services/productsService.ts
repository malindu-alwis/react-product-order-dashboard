import { api } from "./axios";
import type { Product } from "../types/Product";

export const getProducts = async (filters?: {
  name?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
}): Promise<Product[]> => {
  const params: Record<string, string | number> = {};

  if (filters) {
    if (filters.name) params.name = filters.name;
    if (filters.category) params.category = filters.category;
    if (filters.minPrice != null) params.minPrice = filters.minPrice;
    if (filters.maxPrice != null) params.maxPrice = filters.maxPrice;
  }

  const res = await api.get("/products", { params });
  return res.data;
};

export const getProductById = async (id: number): Promise<Product> => {
  const res = await api.get(`/products/${id}`);
  return res.data;
};

export const updateProduct = async (id: number, update: Partial<Product>): Promise<Product> => {
  const res = await api.patch(`/products/${id}`, update);
  return res.data;
};
