import { test, expect, vi } from "vitest";
import { screen, fireEvent } from "@testing-library/react";
import { renderWithProviders } from "../test-utils";
import ProductDetailPage from "../../pages/products/ProductDetailsPage";
import type { Product } from "../../types/Product";


vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useParams: () => ({ id: "1" }),
    useNavigate: () => vi.fn(),
  };
});


vi.mock("../redux/productsSlice", async () => {
  const actual = await vi.importActual("../redux/productsSlice");
  const mockProduct: Product = {
    id: 1,
    name: "Apple iPhone 14",
    category: "Phones",
    description: "Latest iPhone model",
    price: 999,
    stock: 50,
    rating: 4.5,
    active: true,
    image: "/iphone14.png",
  };

  return {
    ...actual,
    fetchProductById: vi.fn().mockImplementation(() => ({
      type: "products/fetchById/fulfilled",
      payload: mockProduct,
    })),
    updateProductStockOrStatus: vi.fn().mockImplementation(({ id, data }: { id: number; data: Partial<Product> }) => ({
      type: "products/update/fulfilled",
      payload: { ...mockProduct, ...data },
    })),
  };
});

test("renders product details and updates stock and status", async () => {
  renderWithProviders(<ProductDetailPage />);


  const productName = await screen.findByText("Apple iPhone 14");
  expect(productName).toBeInTheDocument();


  const stockInput = screen.getByRole("spinbutton") as HTMLInputElement;
  expect(stockInput.value).toBe("50");

  fireEvent.change(stockInput, { target: { value: "60" } });

  const statusSwitch = screen.getByRole("checkbox") as HTMLInputElement;
  expect(statusSwitch.checked).toBe(true);
  fireEvent.click(statusSwitch); 
  expect(statusSwitch.checked).toBe(false);

  fireEvent.click(screen.getByText("Save Changes"));

  const snackbar = await screen.findByText("Product updated successfully");
  expect(snackbar).toBeInTheDocument();

  expect((screen.getByRole("spinbutton") as HTMLInputElement).value).toBe("60");

  expect((screen.getByRole("checkbox") as HTMLInputElement).checked).toBe(false);
});
