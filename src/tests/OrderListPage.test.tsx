import { test, expect, beforeAll, afterEach, afterAll } from "vitest";
import { screen, waitFor, fireEvent } from "@testing-library/react";
import { renderWithProviders } from "./test-utils";
import OrderListPage from "../pages/orders/OrderListPage";
import { setupServer } from "msw/node";
import { handlers } from "../mocks/handlers"; 

// Setup MSW server
const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("renders orders with MSW", async () => {
  renderWithProviders(<OrderListPage />);
  
  await waitFor(() => screen.getByText("Apple iPhone 14"));
  
  expect(screen.getByText("Pending")).toBeInTheDocument();
  expect(screen.getByText("Delivered")).toBeInTheDocument();
});

test("filters orders by status", async () => {
  renderWithProviders(<OrderListPage />);
  
  await waitFor(() => screen.getByText("Apple iPhone 14"));

  const statusSelect = screen.getByLabelText(/Filter by Status/i) as HTMLSelectElement;
  
  fireEvent.change(statusSelect, { target: { value: "Shipped" } });

  await waitFor(() => expect(screen.getByText("Samsung Galaxy S23")).toBeInTheDocument());
  
  expect(screen.queryByText("Apple iPhone 14")).not.toBeInTheDocument();
});
