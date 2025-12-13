import { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Menu,
  MenuItem,
  TableSortLabel,
} from "@mui/material";
import { MoreHoriz } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders, updateOrderStatus } from "../../redux/ordersSlice";
import OrderStatusBadge from "../../components/orders/OrderStatusBadge";
import OrderFilters from "../../components/orders/OrderFilters";
import type { AppDispatch, RootState } from "../../redux/store";
import type { Order } from "../../types/Order";

function OrderListPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading } = useSelector((state: RootState) => state.orders);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const filteredItems = items
    .filter((o) => (statusFilter ? o.status === statusFilter : true))
    .filter((o) =>
      searchQuery
        ? o.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
          o.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
          o.id.toString().includes(searchQuery)
        : true
    )
    .sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortDirection === "asc" ? dateA - dateB : dateB - dateA;
    });

 
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, orderId: number) => {
    setAnchorEl(event.currentTarget);
    setSelectedOrderId(orderId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedOrderId(null);
  };

  const handleStatusChange = (newStatus: string) => {
    if (selectedOrderId !== null) {
      dispatch(updateOrderStatus({ id: selectedOrderId, status: newStatus }));
    }
    handleMenuClose();
  };
  

  const handleSortToggle = () => {
    setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" fontWeight={700}>Orders</Typography>
      </Box>

      <OrderFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
      />

      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Showing{" "}
        <Box component="span" sx={{ color: "primary.main", fontWeight: 600 }}>
          {filteredItems.length}
        </Box>{" "}
        orders
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper} elevation={0} sx={{ border: "1px solid #e0e0e0", borderRadius: 2 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f9fafb" }}>
                <TableCell sx={{ fontWeight: 600, color: "text.secondary" }}>Order ID</TableCell>
                <TableCell sx={{ fontWeight: 600, color: "text.secondary" }}>Product</TableCell>
                <TableCell sx={{ fontWeight: 600, color: "text.secondary" }}>Customer</TableCell>
                <TableCell sx={{ fontWeight: 600, color: "text.secondary" }}>Total</TableCell>
                <TableCell sx={{ fontWeight: 600, color: "text.secondary" }}>
                  <TableSortLabel active direction={sortDirection} onClick={handleSortToggle}>
                    Date
                  </TableSortLabel>
                </TableCell>
                <TableCell sx={{ fontWeight: 600, color: "text.secondary" }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 600, color: "text.secondary" }}>Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredItems.map((order: Order) => {

                return (
                  <TableRow key={order.id} hover>
                    <TableCell sx={{ fontWeight: 500 }}>ORD-{String(order.id).padStart(3, "0")}</TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight={500} color="primary.main">{order.product}</Typography>
                      <Typography variant="caption" color="text.secondary">Qty: {order.quantity}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight={500}>{order.customer}</Typography>
                    </TableCell>
                    <TableCell sx={{ fontWeight: 500 }}>${order.totalPrice}</TableCell>
                    <TableCell sx={{ color: "text.secondary" }}>{order.date}</TableCell>
                    <TableCell>
                      <OrderStatusBadge status={order.status} />
                    </TableCell>
                    <TableCell>
                      <IconButton size="small" onClick={(e) => handleMenuOpen(e, order.id)}>
                        <MoreHoriz />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={() => handleStatusChange("Shipped")}>Mark as Shipped</MenuItem>
        <MenuItem onClick={() => handleStatusChange("Delivered")}>Mark as Delivered</MenuItem>
        <MenuItem onClick={() => handleStatusChange("Cancelled")} sx={{ color: "error.main" }}>Cancel Order</MenuItem>
      </Menu>
    </Box>
  );
}

export default OrderListPage;
