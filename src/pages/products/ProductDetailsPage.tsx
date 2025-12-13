import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Button,
  Switch,
  IconButton,
  TextField,
  Paper,
  Snackbar,
  Alert,
  Rating
} from "@mui/material";
import { ArrowBack, Add, Remove, Save, Inventory2 } from "@mui/icons-material";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductById,
  updateProductStockOrStatus
} from "../../redux/productsSlice";
import type { AppDispatch, RootState } from "../../redux/store";

function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { items, loading } = useSelector((state: RootState) => state.products);
  const [stock, setStock] = useState<number>(0);
  const [active, setActive] = useState<boolean>(true);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: "success" | "error" }>({ open: false, message: "", severity: "success" });

  const product = items.find((p) => p.id === Number(id));

  useEffect(() => {
    if (!product) {
      dispatch(fetchProductById(Number(id)));
    } else {
      setStock(product.stock);
      setActive(product.active);
    }
  }, [dispatch, id, product]);

  if (loading && !product) return <CircularProgress />;
  if (!product) return <Typography>Product not found</Typography>;

  const handleSubmit = async () => {
    try {
      await dispatch(updateProductStockOrStatus({ id: product.id, data: { stock, active } })).unwrap();
      setSnackbar({ open: true, message: "Product updated successfully", severity: "success" });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Update failed";
      setSnackbar({ open: true, message, severity: "error" });
    }
  };

  const handleIncrement = () => setStock((prev) => prev + 1);
  const handleDecrement = () => setStock((prev) => Math.max(0, prev - 1));

  return (
    <Box sx={{ p: 3 }}>
      <Button
        startIcon={<ArrowBack />}
        onClick={() => navigate(-1)}
        sx={{
          color: "#1a365d",
          textTransform: "none",
          mb: 3,
          "&:hover": { backgroundColor: "transparent", textDecoration: "underline" }
        }}
      >
        Back to Products
      </Button>

      <Box sx={{ display: "flex", gap: "100px", flexWrap: { xs: "wrap", md: "nowrap" } }}>
        <Box sx={{ flex: 1, width: { xs: "100%", md: 420 }  }}>
          <Box
            component="img"
            src={product.image}
            alt={product.name}
            sx={{
              width: "100%",
              height: 500,
              objectFit: "cover",
              borderRadius: 2,
              
            }}
          />
        </Box>

        <Box sx={{ flex: 1 }}>
          <Typography
            sx={{
              color: "#38a89d",
              fontWeight: 600,
              fontSize: "0.75rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              mb: 1
            }}
          >
            {product.category}
          </Typography>

          <Typography variant="h4" sx={{ fontWeight: 700, color: "#1a202c", mb: 1 }}>
            {product.name}
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
            <Rating value={product.rating} precision={0.1} readOnly sx={{ color: "#f6ad55" }} />
            <Typography sx={{ fontWeight: 600, color: "#1a202c" }}>{product.rating}</Typography>
            
          </Box>

          <Typography variant="h5" sx={{ fontWeight: 700, color: "#1a202c", mb: 2 }}>
            ${product.price.toFixed(2)}
          </Typography>

          <Typography sx={{ color: "#718096", mb: 4, maxWidth: 400 }}>
            {product.description}
          </Typography>


          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 2,
              border: "1px solid #e2e8f0",
              maxWidth: 400
            }}
          >
            <Typography sx={{ fontWeight: 600, color: "#1a202c", mb: 2 }}>
              Manage Product
            </Typography>

            <Typography sx={{ fontSize: "0.875rem", color: "#4a5568", mb: 1 }}>
              Stock Quantity
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <IconButton
                  onClick={handleDecrement}
                  sx={{
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px 0 0 8px",
                    borderRight: "none",
                    width: 40,
                    height: 40
                  }}
                >
                  <Remove fontSize="small" />
                </IconButton>
                <TextField
                  value={stock}
                  onChange={(e) => setStock(Math.max(0, Number(e.target.value)))}
                  type="number"
                  inputProps={{ style: { textAlign: "center" } }}
                  sx={{
                    width: 70,
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 0,
                      height: 40,
                      "& fieldset": { borderColor: "#e2e8f0" }
                    }
                  }}
                />
                <IconButton
                  onClick={handleIncrement}
                  sx={{
                    border: "1px solid #e2e8f0",
                    borderRadius: "0 8px 8px 0",
                    borderLeft: "none",
                    width: 40,
                    height: 40
                  }}
                >
                  <Add fontSize="small" />
                </IconButton>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, color: "#718096" }}>
                <Inventory2 fontSize="small" />
                <Typography variant="body2">Currently: {product.stock}</Typography>
              </Box>
            </Box>

            {/* Product Status */}
            <Typography sx={{ fontSize: "0.875rem", color: "#4a5568", mb: 1 }}>
              Product Status
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
              <Switch
                checked={active}
                onChange={(e) => setActive(e.target.checked)}
                sx={{
                  "& .MuiSwitch-switchBase.Mui-checked": { color: "#38a89d" },
                  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": { backgroundColor: "#38a89d" }
                }}
              />
              <Typography sx={{ color: active ? "#38a89d" : "#718096", fontWeight: 500 }}>
                {active ? "Active" : "Inactive"}
              </Typography>
            </Box>

            {/* Save Button */}
            <Button
              fullWidth
              variant="contained"
              startIcon={<Save />}
              onClick={handleSubmit}
              sx={{
                backgroundColor: "#38a89d",
                textTransform: "none",
                py: 1.5,
                borderRadius: 2,
                fontWeight: 600,
                "&:hover": { backgroundColor: "#2c7a7b" }
              }}
            >
              Save Changes
            </Button>
          </Paper>
        </Box>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </Box>
  );
}

export default ProductDetailPage;
