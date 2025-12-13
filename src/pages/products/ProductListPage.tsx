import React, { useEffect, useMemo, useState } from "react";
import { Box, Typography, Chip, IconButton, Avatar, CircularProgress } from "@mui/material";
import InventoryIcon from "@mui/icons-material/Inventory2";
import StarIcon from "@mui/icons-material/Star";
import { Edit } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import UnifiedFilters from "../../components/filters/UnifiedFilters";
import ErrorFallback from "../../components/common/ErrorFallback";
import { fetchProducts } from "../../redux/productsSlice";
import type { AppDispatch, RootState } from "../../redux/store";

function ProductListPage() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { items, loading, error } = useSelector((s: RootState) => s.products);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [priceRange, setPriceRange] = useState([0, 3000]);

  const loadProducts = () => {
    dispatch(fetchProducts({ name: search, category, minPrice: priceRange[0], maxPrice: priceRange[1] }));
  };

  useEffect(() => {
    const id = setTimeout(() => {
      loadProducts();
    }, 400);
    return () => clearTimeout(id);
  }, [search, category, priceRange, dispatch]);

  const categoryOptions = useMemo(
    () =>
      Array.from(new Set(items.map((p) => p.category))).map((c) => ({
        label: c,
        value: c,
      })),
    [items]
  );

  const handleReset = () => {
    setSearch("");
    setCategory("");
    setPriceRange([0, 3000]);
  };

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Product",
      flex: 1,
      minWidth: 250,
      renderCell: (params) => (
        <Box display="flex" alignItems="center" gap={2}>
          <Avatar src={params.row.image} variant="rounded" sx={{ width: 44, height: 44 }} />
          <Typography fontWeight={500} color="primary.main">
            {params.value}
          </Typography>
        </Box>
      ),
    },
    {
      field: "price",
      headerName: "Price",
      width: 120,
      renderCell: (params) => <Typography variant="body2">${params.value}</Typography>,
    },
    {
      field: "stock",
      headerName: "Stock",
      width: 120,
      renderCell: (params) => (
        <Box display="flex" alignItems="center" gap={1}>
          <InventoryIcon sx={{ fontSize: 14, color: "text.secondary" }} />
          <Typography variant="body2">{params.value}</Typography>
        </Box>
      ),
    },
    {
      field: "rating",
      headerName: "Rating",
      width: 140,
      renderCell: (params) => (
        <Box display="flex" alignItems="center" gap={0.5}>
          <StarIcon sx={{ fontSize: 14, color: "#facc15" }} />
          <Typography variant="body2">{params.value}</Typography>
        </Box>
      ),
    },
    {
      field: "active",
      headerName: "Status",
      width: 120,
      renderCell: (params) =>
        params.value ? (
          <Chip
            label="Active"
            size="small"
            sx={{ backgroundColor: "#dcfce7", color: "#16a34a", fontWeight: 500 }}
          />
        ) : (
          <Chip
            label="Inactive"
            size="small"
            sx={{ backgroundColor: "#fee2e2", color: "#dc2626", fontWeight: 500 }}
          />
        ),
    },
    {
      field: "actions",
      headerName: "",
      width: 80,
      sortable: false,
      renderCell: (params) => (
        <IconButton
          size="small"
          onClick={() => navigate(`/products/${params.row.id}`)}
          sx={{ color: "text.secondary" }}
        >
          <Edit fontSize="small" />
        </IconButton>
      ),
    },
  ];

  if (error && items.length === 0) {
    return (
      <Box>
        <Typography variant="h5" fontWeight={700} mb={3}>
          Products
        </Typography>
        <ErrorFallback
          type="error"
          title="Failed to load products"
          message={error}
          onRetry={loadProducts}
        />
      </Box>
    );
  }

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" fontWeight={700}>
          Products
        </Typography>
      </Box>

      <UnifiedFilters
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search products..."
        dropdownValue={category}
        onDropdownChange={setCategory}
        dropdownLabel="Category"
        dropdownOptions={categoryOptions}
        showPriceRange
        priceRange={priceRange}
        onPriceChange={setPriceRange}
        priceMin={0}
        priceMax={3000}
        showReset
        onReset={handleReset}
      />

      <Typography color="text.secondary" mb={2}>
        Showing {items.length} products
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" py={6}>
          <CircularProgress />
        </Box>
      ) : items.length === 0 ? (
        <ErrorFallback
          type="empty"
          title="No products found"
          message="There are no products matching your filters. Try adjusting your search criteria."
          onRetry={handleReset}
          retryLabel="Clear Filters"
        />
      ) : (
        <DataGrid
          rows={items}
          columns={columns}
          pageSizeOptions={[8, 16]}
          initialState={{ pagination: { paginationModel: { pageSize: 8 } } }}
          disableRowSelectionOnClick
          autoHeight
          sx={{
            border: "1px solid #e0e0e0",
            borderRadius: 2,
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#f9fafb",
              fontWeight: 600,
              color: "text.secondary",
            },
            "& .MuiDataGrid-columnHeaderTitle": { fontWeight: 600 },
            "& .MuiDataGrid-cell": { display: "flex", alignItems: "center" },
            "& .MuiDataGrid-row:hover": { backgroundColor: "#f9fafb" },
          }}
        />
      )}
    </Box>
  );
}

export default ProductListPage;
