import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { BrowserRouter } from "react-router-dom";
import ProductsPage from "../pages/products/ProductListPage";

test("renders DataGrid with products", async () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <ProductsPage />
      </BrowserRouter>
    </Provider>
  );

  expect(await screen.findByRole("grid")).toBeInTheDocument();
});