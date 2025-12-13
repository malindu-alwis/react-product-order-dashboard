import { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Snackbar,
  Alert,
} from "@mui/material";
import { MoreHoriz } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders, updateOrderStatus } from "../../features/orders/ordersSlice";
import OrderStatusBadge from "../../components/common/OrderStatusBadge";
import UnifiedFilters from "../../components/filters/UnifiedFilters";
import ConfirmationDialog from "../../components/common/ConfirmationDialog";
import ErrorFallback from "../../components/common/ErrorFallback";
import type { AppDispatch, RootState } from "../../redux/store";
import type { Order } from "../../types/Order";
import { DataGrid, type GridColDef, type GridRenderCellParams } from "@mui/x-data-grid";

const ORDER_STATUSES = [
  { label: "Pending", value: "Pending" },
  { label: "Shipped", value: "Shipped" },
  { label: "Delivered", value: "Delivered" },
  { label: "Cancelled", value: "Cancelled" },
];

function OrderListPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, error } = useSelector((state: RootState) => state.orders);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);
  const [confirmDialog, setConfirmDialog] = useState<{
    open: boolean;
    status: string;
    orderId: number | null;
  }>({
    open: false,
    status: "",
    orderId: null,
  });
  const [updating, setUpdating] = useState(false);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({
    open: false,
    message: "",
    severity: "success",
  });

  const loadOrders = () => {
    dispatch(fetchOrders());
  };

  useEffect(() => {
    loadOrders();
  }, [dispatch]);

  const filteredItems = items
    .filter((o) => (statusFilter ? o.status === statusFilter : true))
    .filter((o) =>
      searchQuery
        ? o.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
          o.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
          o.id.toString().includes(searchQuery)
        : true
    );

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, orderId: number) => {
    setAnchorEl(event.currentTarget);
    setSelectedOrderId(orderId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedOrderId(null);
  };

  const handleStatusChangeRequest = (newStatus: string) => {
    setConfirmDialog({ open: true, status: newStatus, orderId: selectedOrderId });
    handleMenuClose();
  };

  const handleConfirmStatusChange = async () => {
    if (confirmDialog.orderId === null) return;
    setUpdating(true);
    try {
      await dispatch(
        updateOrderStatus({ id: confirmDialog.orderId, status: confirmDialog.status })
      ).unwrap();
      setSnackbar({ open: true, message: "Order updated successfully", severity: "success" });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Update failed";
      setSnackbar({ open: true, message, severity: "error" });
    } finally {
      setUpdating(false);
      setConfirmDialog({ open: false, status: "", orderId: null });
    }
  };

  const handleCloseConfirmDialog = () => {
    if (!updating) {
      setConfirmDialog({ open: false, status: "", orderId: null });
    }
  };

  const handleReset = () => {
    setSearchQuery("");
    setStatusFilter("");
  };

  const getConfirmationMessage = () => {
    const status = confirmDialog.status;
    if (status === "Cancelled") {
      return "Are you sure you want to cancel this order? This action cannot be undone.";
    }
    return `Are you sure you want to mark this order as "${status}"?`;
  };

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "Order ID",
      flex: 1,
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant="caption">ORD-{String(params.value).padStart(3, "0")}</Typography>
      ),
    },
    {
      field: "product",
      headerName: "Product",
      flex: 1.5,
      renderCell: (params: GridRenderCellParams<Order>) => (
        <Typography variant="body2" fontWeight={500} color="primary.main">
          {params.value}
        </Typography>
      ),
    },
    {
      field: "quantity",
      headerName: "Quantity",
      flex: 1,
      renderCell: (params: GridRenderCellParams<Order>) => (
        <Typography variant="caption">{params.row.quantity}</Typography>
      ),
    },
    {
      field: "customer",
      headerName: "Customer",
      flex: 1,
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant="body2">{params.value}</Typography>
      ),
    },
    {
      field: "totalPrice",
      headerName: "Total",
      flex: 1,
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant="body2">${params.value}</Typography>
      ),
    },
    {
      field: "date",
      headerName: "Date",
      flex: 1,
      sortable: true,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params: GridRenderCellParams) => <OrderStatusBadge status={params.value} />,
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.5,
      sortable: false,
      filterable: false,
      renderCell: (params: GridRenderCellParams<Order>) => (
        <IconButton size="small" onClick={(e) => handleMenuOpen(e, params.row.id)}>
          <MoreHoriz />
        </IconButton>
      ),
    },
  ];

 
  if (error && items.length === 0) {
    return (
      <Box>
        <Typography variant="h5" fontWeight={700} mb={3}>
          Orders
        </Typography>
        <ErrorFallback
          type="error"
          title="Failed to load orders"
          message={error}
          onRetry={loadOrders}
        />
      </Box>
    );
  }

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" fontWeight={700}>
          Orders
        </Typography>
      </Box>

      <UnifiedFilters
        search={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Search orders..."
        dropdownValue={statusFilter}
        onDropdownChange={setStatusFilter}
        dropdownLabel="Status"
        dropdownOptions={ORDER_STATUSES}
        showReset
        onReset={handleReset}
      />

      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Showing{" "}
        <Box component="span" sx={{ color: "primary.main", fontWeight: 600 }}>
          {filteredItems.length}
        </Box>{" "}
        orders
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" py={6}>
          <CircularProgress />
        </Box>
      ) : filteredItems.length === 0 ? (
        <ErrorFallback
          type="empty"
          title="No orders found"
          message="There are no orders matching your filters. Try adjusting your search criteria."
          onRetry={handleReset}
          retryLabel="Clear Filters"
        />
      ) : (
        <Paper elevation={0} sx={{ border: "1px solid #e0e0e0", borderRadius: 2 }}>
          <DataGrid
            rows={filteredItems}
            columns={columns}
            autoHeight
            disableRowSelectionOnClick
            hideFooter
            sx={{
              border: "none",
              "& .MuiDataGrid-columnHeaders": { backgroundColor: "#f9fafb" },
              "& .MuiDataGrid-columnHeaderTitle": { fontWeight: 600, color: "text.secondary" },
              "& .MuiDataGrid-cell": { display: "flex", alignItems: "center" },
            }}
          />
        </Paper>
      )}


      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={() => handleStatusChangeRequest("Shipped")}>Mark as Shipped</MenuItem>
        <MenuItem onClick={() => handleStatusChangeRequest("Delivered")}>
          Mark as Delivered
        </MenuItem>
        <MenuItem onClick={() => handleStatusChangeRequest("Cancelled")} sx={{ color: "error.main" }}>
          Cancel Order
        </MenuItem>
      </Menu>


      <ConfirmationDialog
        open={confirmDialog.open}
        onClose={handleCloseConfirmDialog}
        onConfirm={handleConfirmStatusChange}
        title="Confirm Status Change"
        message={getConfirmationMessage()}
        confirmText={confirmDialog.status === "Cancelled" ? "Cancel Order" : "Confirm"}
        confirmColor={confirmDialog.status === "Cancelled" ? "error" : "primary"}
        loading={updating}
      />


      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default OrderListPage;
