import { test, expect, describe } from "vitest";
import productReducer, {
  fetchProducts,
  updateProductStockOrStatus,
} from "../../features/products/productsSlice";
import { products } from "../../mocks/data/products";

describe("productSlice reducer", () => {
  test("should return initial state", () => {
    expect(productReducer(undefined, { type: "unknown" })).toEqual({
      items: [],
      loading: false,
      error: null,
    });
  });

  test("should handle fetchProducts.fulfilled", () => {
    const action = {
      type: fetchProducts.fulfilled.type,
      payload: products,
    };

    const prevState = { items: [], loading: true, error: null };
    const state = productReducer(prevState, action);

    expect(state.items.length).toBe(products.length);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(null);
  });

  test("should handle updateProductStockOrStatus.fulfilled", () => {
    const updatedProduct = { ...products[0], stock: 99 };

    const action = {
      type: updateProductStockOrStatus.fulfilled.type,
      payload: updatedProduct,
    };

    const prevState = { items: products, loading: false, error: null };
    const state = productReducer(prevState, action);

    expect(state.items[0].stock).toBe(99);
  });
});
