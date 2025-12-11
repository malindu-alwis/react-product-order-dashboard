export interface Order {
    id: number;
    productId: number;
    quantity: number;
    status: "Pending" | "Shipped" | "Delivered" | "Cancelled";
    date: string;
  }
  