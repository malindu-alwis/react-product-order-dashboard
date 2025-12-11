import { products } from "./data/products";
import { orders } from "./data/orders";
import { http, HttpResponse } from 'msw'; 

export const handlers = [
  // Products
  http.get("/api/products", () => {
    return HttpResponse.json(products);
  }),
  
  http.get("/api/products/:id", ({ params }) => {
    const { id } = params;
    const product = products.find(p => p.id === Number(id));
    return HttpResponse.json(product);
  }),
  
  http.patch("/api/products/:id", async ({ params, request }) => {
    const { id } = params;
    const update = await request.json() as Partial<typeof products[0]>;
    const product = products.find(p => p.id === Number(id));
    
    if (product) {
      Object.assign(product, update);
      return HttpResponse.json(product);
    }
    
    return new HttpResponse(null, { status: 404 });
  }),

  // Orders
  http.get("/api/orders", () => {
    return HttpResponse.json(orders);
  }),
];