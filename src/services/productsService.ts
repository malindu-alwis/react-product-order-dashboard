import { api } from "./axios";
import type { Product } from "../types/Product";

export const getProducts = async (): Promise<Product[]> => {
  const res = await api.get("/products");
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
