import React, { useEffect, useMemo, useState } from "react";
import { Box, Typography, Chip, IconButton, Avatar } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import InventoryIcon from "@mui/icons-material/Inventory2";
import StarIcon from "@mui/icons-material/Star";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import ProductFilters from "../../components/products/ProductFilters";
import { fetchProducts } from "../../redux/productsSlice";
import type { AppDispatch, RootState } from "../../redux/store";


export default function ProductListPage() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { items, loading } = useSelector((s: RootState) => s.products);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [priceRange, setPriceRange] = useState([0, 3000]);

  useEffect(() => {
    const id = setTimeout(() => {
      dispatch(fetchProducts({ name: search, category, minPrice: priceRange[0], maxPrice: priceRange[1] }));
    }, 400);
  
    return () => clearTimeout(id);
  }, [search, category, priceRange, dispatch]);

  const categories = useMemo(
    () => Array.from(new Set(items.map((p) => p.category))),
    [items]
  );

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Product",
      flex: 1,
      minWidth: 250,
      renderCell: (params) => (
        <Box display="flex" alignItems="center" gap={2}>
          <Avatar
            src={params.row.image}
            variant="rounded"
            sx={{ width: 44, height: 44 }}
          />
          <Typography fontWeight={500}>{params.value}</Typography>
        </Box>
      ),
    },
    {
      field: "price",
      headerName: "Price",
      width: 120,
      renderCell: (params) => (
        <Typography fontWeight={500}>${params.value}</Typography>
      ),
    },
    {
      field: "stock",
      headerName: "Stock",
      width: 120,
      renderCell: (params) => (
        <Box display="flex" alignItems="center" gap={1}>
          <InventoryIcon sx={{ fontSize: 16, color: "text.secondary" }} />
          <Typography>{params.value}</Typography>
        </Box>
      ),
    },
    {
      field: "rating",
      headerName: "Rating",
      width: 140,
      renderCell: (params) => (
        <Box display="flex" alignItems="center" gap={0.5}>
          <StarIcon sx={{ fontSize: 16, color: "#facc15" }} />
          <Typography>{params.value}</Typography>
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
            sx={{
              backgroundColor: "#dcfce7",
              color: "#16a34a",
              fontWeight: 500,
            }}
          />
        ) : (
          <Chip
            label="Inactive"
            size="small"
            sx={{
              backgroundColor: "#fee2e2",
              color: "#dc2626",
              fontWeight: 500,
            }}
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
          <VisibilityIcon fontSize="small" />
        </IconButton>
      ),
    },
  ];

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" fontWeight={700}>
          Products
        </Typography>
      </Box>

      <ProductFilters
        search={search}
        category={category}
        priceRange={priceRange}
        categories={categories}
        onSearchChange={setSearch}
        onCategoryChange={setCategory}
        onPriceChange={setPriceRange}
        onClear={() => {
          setSearch("");
          setCategory("");
          setPriceRange([0, 3000]);
        }}
      />

      <Typography color="text.secondary" mb={2}>
        Showing {items.length} products
      </Typography>

      <Box
        sx={{
          height: 520,
          "& .MuiDataGrid-root": {
            border: "none",
            backgroundColor: "background.paper",
            borderRadius: 3,
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "background.default",
            borderRadius: "12px 12px 0 0",
          },
          "& .MuiDataGrid-cell": {
            display: "flex",
            alignItems: "center",
          },
        }}
      >
        <DataGrid
          rows={items}
          columns={columns}
          loading={loading}
          pageSizeOptions={[8, 16]}
          initialState={{
            pagination: { paginationModel: { pageSize: 8 } },
          }}
          disableRowSelectionOnClick
          sx={{ borderRadius: 3 }}
        />
      </Box>
    </Box>
  );
}