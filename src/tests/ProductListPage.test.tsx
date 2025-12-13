import { test, expect, beforeAll, afterEach, afterAll } from "vitest";
import { screen, waitFor, fireEvent } from "@testing-library/react";
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

  // Wait for product names to appear in the table
  await waitFor(() => {
    expect(screen.getByText("Apple iPhone 14")).toBeInTheDocument();
    expect(screen.getByText("Dell XPS 15")).toBeInTheDocument();
  });
});

test("filters products by category", async () => {
  renderWithProviders(<ProductListPage />);

  // Wait for initial products to load
  await waitFor(() => screen.getByText("Apple iPhone 14"));

  // Find the category select input
  const categorySelect = screen.getByRole("combobox", { name: /category/i });

  // Change category to "Laptops"
  fireEvent.change(categorySelect, { target: { value: "Laptops" } });

  // Wait for filtered products
  await waitFor(() => {
    expect(screen.getByText("Apple MacBook Pro 16")).toBeInTheDocument();
    expect(screen.queryByText("Apple iPhone 14")).not.toBeInTheDocument();
  });
});
