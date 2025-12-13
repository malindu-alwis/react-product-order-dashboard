import { Chip } from "@mui/material";
import { AccessTime, LocalShipping, CheckCircle, Cancel } from "@mui/icons-material";

interface OrderStatusBadgeProps {
  status: string;
}

const statusConfig: Record<string, { color: string; bgColor: string; icon: React.ReactNode }> = {
  Pending: { color: "#f59e0b", bgColor: "#fef3c7", icon: <AccessTime sx={{ fontSize: 14 }} /> },
  Shipped: { color: "#3b82f6", bgColor: "#dbeafe", icon: <LocalShipping sx={{ fontSize: 14 }} /> },
  Delivered: { color: "#22c55e", bgColor: "#dcfce7", icon: <CheckCircle sx={{ fontSize: 14 }} /> },
  Cancelled: { color: "#ef4444", bgColor: "#fee2e2", icon: <Cancel sx={{ fontSize: 14 }} /> },
};

function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
  const config = statusConfig[status] || statusConfig.Pending;
  
  return (
    <Chip
      icon={config.icon}
      label={status}
      size="small"
      sx={{
        backgroundColor: config.bgColor,
        color: config.color,
        fontWeight: 500,
        fontSize: "0.75rem",
        "& .MuiChip-icon": { color: config.color },
      }}
    />
  );
}

export default OrderStatusBadge;
