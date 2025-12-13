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

test("renders product list with MSW mock using http wrapper", async () => {
  renderWithProviders(<ProductListPage />);
  await waitFor(() =>
    expect(screen.getByText("Apple iPhone 14")).toBeInTheDocument()
  );
  expect(screen.getByText("Samsung Galaxy S23")).toBeInTheDocument();
});
