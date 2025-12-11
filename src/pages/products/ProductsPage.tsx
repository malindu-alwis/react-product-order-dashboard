import { useEffect, useState } from "react";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/productsSlice";
import type { AppDispatch, RootState } from "../../redux/store";
import { Alert, Box, Button, CircularProgress } from "@mui/material";

const ProductsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, error } = useSelector((state: RootState) => state.products);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => { 
    dispatch(fetchProducts()); 
  }, [dispatch, retryCount]);

  const isValidProductData = (data: any[]) => {
    if (!Array.isArray(data)) return false;
    if (data.length === 0) return false;
    
    const firstItem = data[0];
    if (typeof firstItem === 'string' && firstItem.includes('<!doctype')) {
      console.error('Received HTML instead of product data:', data);
      return false;
    }
    
    return firstItem && typeof firstItem === 'object' && 'id' in firstItem;
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 50 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "category", headerName: "Category", width: 150 },
    { field: "price", headerName: "Price", width: 100, type: 'number' },
    { field: "stock", headerName: "Stock", width: 100, type: 'number' }
  ];

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height={400}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ m: 2 }}>
        Error loading products: {error}
        <Button 
          onClick={() => setRetryCount(prev => prev + 1)} 
          sx={{ ml: 2 }}
          variant="outlined"
        >
          Retry
        </Button>
      </Alert>
    );
  }

  // Check if data is valid before rendering DataGrid
  if (!isValidProductData(items)) {
    return (
      <Alert severity="warning" sx={{ m: 2 }}>
        Unable to load product data. The server may be returning incorrect content.
        <br />
        <Button 
          onClick={() => setRetryCount(prev => prev + 1)} 
          sx={{ mt: 1 }}
          variant="outlined"
        >
          Retry
        </Button>
      </Alert>
    );
  }

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid 
        rows={items} 
        columns={columns} 
        loading={loading} 
        pageSize={5}
        rowsPerPageOptions={[5]}
        getRowId={(row) => row.id}
      />
    </div>
  );
}

export default ProductsPage;