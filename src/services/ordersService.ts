import { api } from "./axios";
import type { Order } from "../types/Order";


export const getOrders = async (): Promise<Order[]> => {
  const res = await api.get("/orders");
  return res.data;
};


export const updateOrder = async (
  id: number,
  data: Partial<Order>
): Promise<Order> => {
  const res = await api.patch(`/orders/${id}`, data); 
  return res.data;
};
