import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import MainLayout from './layout/MainLayout'
import { CssBaseline, ThemeProvider } from "@mui/material";
import { SnackbarProvider } from "notistack";
import { getTheme } from "./theme";
import { useSelector } from 'react-redux';
import ProductsPage from './pages/products/ProductsPage';
import ProductDetailsPage from './pages/products/ProductDetailsPage';
import OrdersPage from './pages/orders/OrdersPage';
import type { RootState } from './redux/store';

function App() {

  //const mode = useSelector((s: RootState) => s.ui.theme);

  return (
    
    <ThemeProvider theme={getTheme("light")}>
      <CssBaseline />
      <SnackbarProvider maxSnack={3}>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Navigate to="/products" />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="products/:id" element={<ProductDetailsPage />} />
            <Route path="orders" element={<OrdersPage />} />
          </Route>
        </Routes>
      </SnackbarProvider>
    </ThemeProvider>

  )
}

export default App
