import { useRoutes, Navigate } from "react-router-dom";
import DashboardLayout from "./layout/DashboardLayout";
import ProductListPage from "./pages/products/ProductListPage";
import ProductDetailPage from "./pages/products/ProductDetailsPage";
import OrderListPage from "./pages/orders/OrderListPage";
import "./App.css"


function App() {
  return useRoutes([
    {
      path: "/",
      element: <DashboardLayout />,
      children: [
        { index: true, element: <Navigate to="/products" replace /> },
        { path: "products", element: <ProductListPage /> },
        { path: "products/:id", element: <ProductDetailPage /> },
        { path: "orders", element: <OrderListPage /> },
      ],
    },
  ]);
}
export default App
