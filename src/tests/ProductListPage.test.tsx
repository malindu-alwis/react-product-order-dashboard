import { test, expect, beforeAll, afterEach, afterAll } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import { renderWithProviders } from "./test-utils";
import ProductListPage from "../pages/products/ProductListPage";
import { setupServer } from "msw/node";
import { handlers } from "../mocks/handlers";

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("renders all products", async () => {
  renderWithProviders(<ProductListPage />);
  await waitFor(() => expect(screen.getByText("Apple iPhone 14")).toBeInTheDocument());
  expect(screen.getByText("Dell XPS 15")).toBeInTheDocument();
});

test("filters products by category", async () => {
  renderWithProviders(<ProductListPage />);
  await waitFor(() => screen.getByText("Apple iPhone 14"));

  const categorySelect = screen.getByLabelText(/Category/i) as HTMLSelectElement;
  
  categorySelect.value = "Laptops"; 
  categorySelect.dispatchEvent(new Event("change", { bubbles: true }));

  await waitFor(() => expect(screen.getByText("Apple MacBook Pro 16")).toBeInTheDocument());
  expect(screen.queryByText("Apple iPhone 14")).not.toBeInTheDocument();
});
