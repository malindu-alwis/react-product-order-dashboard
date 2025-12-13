import { test, expect, vi } from "vitest";
import { renderWithProviders } from "../test-utils";
import { screen } from "@testing-library/react";
import OrderListPage from "../../pages/orders/OrderListPage";

const mockOrders = [
  {
    id: 1,
    product: "Apple iPhone 14",
    customer: "John Doe",
    quantity: 1,
    totalPrice: 999,
    date: "2024-01-01",
    status: "Pending",
  },
  {
    id: 2,
    product: "Samsung Galaxy S23",
    customer: "Jane Smith",
    quantity: 2,
    totalPrice: 1599,
    date: "2024-01-02",
    status: "Shipped",
  },
];

vi.mock("../services/ordersService", () => {
  return {
    getOrders: vi.fn(() => Promise.resolve(mockOrders)),
    updateOrder: vi.fn(({ id, status }) =>
      Promise.resolve({ id, status })
    ),
  };
});

test("renders orders after fetchOrders", async () => {
  renderWithProviders(<OrderListPage />);

  expect(await screen.findByText("Apple iPhone 14")).toBeInTheDocument();
  expect(screen.getByText("Samsung Galaxy S23")).toBeInTheDocument();
});
