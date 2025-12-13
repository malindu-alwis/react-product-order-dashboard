import { products } from "./data/products";
import { orders } from "./data/orders";
import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("/api/products", ({ request }) => {
    const url = new URL(request.url);

    const name = url.searchParams.get("name");
    const category = url.searchParams.get("category");
    const minPrice = Number(url.searchParams.get("minPrice"));
    const maxPrice = Number(url.searchParams.get("maxPrice"));

    let result = [...products];

    if (name) {
      result = result.filter(p =>
        p.name.toLowerCase().includes(name.toLowerCase())
      );
    }

    if (category) {
      result = result.filter(p => p.category === category);
    }

    if (!isNaN(minPrice)) {
      result = result.filter(p => p.price >= minPrice);
    }

    if (!isNaN(maxPrice)) {
      result = result.filter(p => p.price <= maxPrice);
    }

    return HttpResponse.json(result);
  }),

  http.get("/api/products/:id", ({ params }) => {
    const product = products.find(p => p.id === Number(params.id));
    return HttpResponse.json(product);
  }),

  http.patch("/api/products/:id", async ({ params, request }) => {
    const update = await request.json();
    const product = products.find(p => p.id === Number(params.id));
    Object.assign(product!, update);
    return HttpResponse.json(product);
  }),


  http.get("/api/orders", () => {
    return HttpResponse.json(orders);
  }),

  http.patch("/api/orders/:id", async ({ params, request }) => {
    const update = await request.json(); 
    const order = orders.find(o => o.id === Number(params.id));

    if (!order) {
      return HttpResponse.json({ error: "Order not found" }, { status: 404 });
    }

    Object.assign(order, update); 
    return HttpResponse.json(order);
  }),
];
