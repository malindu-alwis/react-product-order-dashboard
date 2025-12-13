import { test, expect, beforeAll, afterEach, afterAll } from "vitest";
import { screen, waitFor, fireEvent } from "@testing-library/react";
import { renderWithProviders } from "./test-utils";
import ProductDetailPage from "../pages/products/ProductDetailsPage";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { setupServer } from "msw/node";
import { handlers } from "../mocks/handlers";

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("renders product details and updates stock", async () => {
  renderWithProviders(
    <MemoryRouter initialEntries={["/products/1"]}>
      <Routes>
        <Route path="/products/:id" element={<ProductDetailPage />} />
      </Routes>
    </MemoryRouter>
  );

  await waitFor(() => screen.getByText("Apple iPhone 14"));

  const stockInput = screen.getByLabelText(/Stock Quantity/i) as HTMLInputElement;
  expect(stockInput.value).toBe("50"); 

  fireEvent.change(stockInput, { target: { value: "60" } });

  fireEvent.click(screen.getByText("Update"));

  await waitFor(() => screen.getByText("Product updated successfully"));
});
